/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('../libs/logger')
const utils_project = require('../services/utils/project')
const utils_filter = require('../services/utils/filter')
const fs = require('fs')
const path = require('path')
const utils_progress = require('../services/utils/progress')
const response = require('../libs/response')
const Project = require('../models/project')
const mongoose = require('mongoose')

module.exports = {
  /**
   * @route This route will handle the project
   */
  create_project: async (req, res) => {
    logger.log('Creating Project')

    const body = req.body

    const uploads_path = path.join(__dirname).replace('controllers', 'middleware/uploads')
    // console.log(fs.readFileSync('../middleware/uploads/' + req.file.filename))
    if (req.file) {
      const image = {
        data: fs.readFileSync(uploads_path + '/' + req.file.filename),
        contentType: req.file.mimetype
      }
      body.img = image
    }
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
    try {
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
    } catch (error) {
      return response.bad_request(res, error)
    }

  },
  /**
   * @route This route will handle update for the project
   */
  update_project_by_id: async (req, res) => {
    try {
      logger.log('Updating Project')

      const body = req.body
      const project_id = body._id
      const get_project = await utils_project.get_project_by_id(body._id)
      if (!get_project) {
        return response.error(res, 401, 'The _id you provided cannot find any in our collection')
      }
      delete body._id
      const update_project = await utils_project.update_project_by_id(project_id, body)

      return response.other(res, 200, { message: 'Successfully updated a Project', data: update_project })
    } catch (error) {
      return response.bad_request(res, error)
    }
  },
  /**
   * @route This route will handle proceeding for the project
   */
  proceed_next_progress: async (req, res) => {
    logger.log('Proceeding Project')

    const body = req.body
    const params = req.params
    let last_step = null
    let current_step = null
    let next_step = null

    if (params._id === undefined) {
      if (!mongoose.Types.ObjectId.isValid(params._id)) return response.error(res, 400, { message: 'Please provide a valid mongo _id' })
    }
    const get_project = await utils_project.get_project_by_id(params._id)
    if (!get_project) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }

    // Setup steps
    if (!body.next_step) {
      last_step = get_project.step - 1
      current_step = get_project.step
      next_step = get_project.step++
    } else {
      last_step = body.next_step - 2
      current_step = body.next_step - 1
      next_step = body.next_step
    }

    // Get progress by provided step

    return response.other(res, 200, { message: 'Successfully updated a Project', data: update_project })
  },
  /**
   * @route This route will handle the project
   */
  delete_project_by_id: async (req, res) => {
    try {
      logger.log('Deleting Project')

    const params = req.query

    const get_project = await utils_project.get_project_by_id(params._id)
    if (!get_project) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const delete_project = await utils_project.delete_project_by_id(params._id)
    return response.other(res, 200, { message: 'Successfully deleted a Project', data: delete_project })
    } catch (error) {
      return response.bad_request(res, error)
    }
  }
}
