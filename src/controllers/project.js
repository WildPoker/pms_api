/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('@src/libs/logger')
const utils_project = require('@src/services/utils/project')
const response = require('@src/libs/response')

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
  get_project_by_id: async (req, res) => {
    logger.log('Creating Project')

    const params = req.query

    const get_project = await utils_project.get_project_by_id(params._id)
    if (!get_project) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    return response.other(res, 200, { message: 'Successfully queried a Project', data: get_project })
  },

  /**
   * @route This route will handle update for the project
   */
  update_project_by_id: async (req, res) => {
    logger.log('Creating Project')

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
    logger.log('Creating Project')

    const params = req.query

    const get_project = await utils_project.get_project_by_id(params._id)
    if (!get_project) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const delete_project = await utils_project.delete_project_by_id(params._id)
    return response.other(res, 200, { message: 'Successfully deleted a Project', data: delete_project })
  }
}
