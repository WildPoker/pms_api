/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('@src/libs/logger')
const utils_project = require('@src/services/utils/project')
const utils_filter = require('@src/services/utils/filter')
const response = require('@src/libs/response')
const Project = require('@src/models/project')
const mongoose = require('mongoose')

module.exports = {
  /**
   * @route This route will handle the project
   */
  create_project: async (req, res) => {
    logger.log('Creating Project')

    const body = req.body

    const create_project = await utils_project.insert_project(body)
    if (!create_project) {
      return response.error(res, 401, 'Unable to create a project')
    }
    return response.other(res, 200, { message: 'Successfully created a Project', data: create_project })
  },
  /**
   * @route This route will handle the project
   */
  get_project: async (req, res) => {
    logger.log('Getting Project')

    const args = req.query
    const params = req.params
    if (params._id !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(params._id)) return response.error(res, 400, { message: 'Please provide a valid mongo _id' })
      const get_project_by_id = await utils_project.get_project_by_id(params._id)
      if (get_project_by_id.error) return response.error(res, 400, { message: 'Please provide an _id of the project' })

      return response.info(res, 201, { message: 'Successfully returned a user', data: get_project_by_id })
    }
    // Check type
    const limit = utils_filter.handle_limit_argument(args.limit)
    const skip = utils_filter.handle_skip_argument(args.skip)
    const sort = utils_filter.handle_sort_argument(args.sort, Project)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)

    const projects = await utils_project.get_all_projects({ limit, skip, sort, order, joint })
    return response.info(res, 201, { message: 'Successfully returned a project', data: projects[0] })
  },

  /**
   * @route This route will handle update for the project
   */
  update_project_by_id: async (req, res) => {
    logger.log('Updating Project')

    const body = req.body

    const get_project = await utils_project.get_project_by_id(body._id)
    if (!get_project) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const update_project = await utils_project.update_project_by_id(body._id, body)
    return response.other(res, 200, { message: 'Successfully updated a Project', data: update_project })
  },
  /**
   * @route This route will handle the project
   */
  delete_project_by_id: async (req, res) => {
    logger.log('Deleting Project')

    const params = req.query

    const get_project = await utils_project.get_project_by_id(params._id)
    if (!get_project) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const delete_project = await utils_project.delete_project_by_id(params._id)
    return response.other(res, 200, { message: 'Successfully deleted a Project', data: delete_project })
  }
}
