/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('@src/libs/logger')
const utils_progress = require('@src/services/utils/progress')
const utils_filter = require('@src/services/utils/filter')
const response = require('@src/libs/response')
const Progress = require('@src/models/progress')
const mongoose = require('mongoose')

module.exports = {
  /**
   * @route This route will handle the progress
   */
  create_progress: async (req, res) => {
    logger.log('Creating Progress')

    const body = req.body

    const create_progress = await utils_progress.insert_progress(body)
    if (!create_progress) {
      return response.error(res, 401, 'Unable to create a progress')
    }
    return response.other(res, 200, { message: 'Successfully created a Progress', data: create_progress })
  },
  /**
   * @route This route will handle the progress
   */
  get_progress: async (req, res) => {
    logger.log('Getting Progress')

    const args = req.query
    const params = req.params
    if (params._id !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(params._id)) return response.error(res, 400, { message: 'Please provide a valid mongo _id' })
      const get_progress_by_id = await utils_progress.get_progress_by_id(params._id)
      if (!get_progress_by_id) return response.error(res, 400, { message: 'Cant find an progress of provided _id' })

      return response.info(res, 201, { message: 'Successfully returned a progress', data: get_progress_by_id })
    }
    // Check type
    const limit = utils_filter.handle_limit_argument(args.limit)
    const skip = utils_filter.handle_skip_argument(args.skip)
    const sort = utils_filter.handle_sort_argument(args.sort, Progress)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)

    const progresss = await utils_progress.get_all_progresss({ limit, skip, sort, order, joint })
    return response.info(res, 201, { message: 'Successfully returned a progress', data: progresss[0] })
  },

  /**
   * @route This route will handle update for the progress
   */
  update_progress_by_id: async (req, res) => {
    logger.log('Updating Progress')

    const body = req.body

    const get_progress = await utils_progress.get_progress_by_id(body._id)
    if (!get_progress) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const update_progress = await utils_progress.update_progress_by_id(body._id, body)
    return response.other(res, 200, { message: 'Successfully updated a Progress', data: update_progress })
  },
  /**
   * @route This route will handle the progress
   */
  delete_progress_by_id: async (req, res) => {
    logger.log('Deleting Progress')

    const params = req.query

    const get_progress = await utils_progress.get_progress_by_id(params._id)
    if (!get_progress) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const delete_progress = await utils_progress.delete_progress_by_id(params._id)
    return response.other(res, 200, { message: 'Successfully deleted a Progress', data: delete_progress })
  }
}
