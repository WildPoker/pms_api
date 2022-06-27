/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('@src/libs/logger')
const utils_image = require('@src/services/utils/image')
const utils_filter = require('@src/services/utils/filter')
const response = require('@src/libs/response')
const Image = require('@src/models/image')
const mongoose = require('mongoose')

module.exports = {
  /**
   * @route This route will handle the image
   */
  create_image: async (req, res) => {
    logger.log('Creating Image')

    const body = req.body

    const create_image = await utils_image.insert_image(body)
    if (!create_image) {
      return response.error(res, 401, 'Unable to create a image')
    }
    return response.other(res, 200, { message: 'Successfully created a Image', data: create_image })
  },
  /**
   * @route This route will handle the image
   */
  get_image: async (req, res) => {
    logger.log('Getting Image')

    const args = req.query
    const params = req.params
    if (params._id !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(params._id)) return response.error(res, 400, { message: 'Please provide a valid mongo _id' })
      const get_image_by_id = await utils_image.get_image_by_id(params._id)
      if (!get_image_by_id) return response.error(res, 400, { message: 'Cant find an image of provided _id' })

      return response.info(res, 201, { message: 'Successfully returned a image', data: get_image_by_id })
    }
    // Check type
    const limit = utils_filter.handle_limit_argument(args.limit)
    const skip = utils_filter.handle_skip_argument(args.skip)
    const sort = utils_filter.handle_sort_argument(args.sort, Image)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)

    const images = await utils_image.get_all_images({ limit, skip, sort, order, joint })
    return response.info(res, 201, { message: 'Successfully returned a image', data: images[0] })
  },

  /**
   * @route This route will handle update for the image
   */
  update_image_by_id: async (req, res) => {
    logger.log('Updating Image')

    const body = req.body

    const get_image = await utils_image.get_image_by_id(body._id)
    if (!get_image) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const update_image = await utils_image.update_image_by_id(body._id, body)
    return response.other(res, 200, { message: 'Successfully updated a Image', data: update_image })
  },
  /**
   * @route This route will handle the image
   */
  delete_image_by_id: async (req, res) => {
    logger.log('Deleting Image')

    const params = req.query

    const get_image = await utils_image.get_image_by_id(params._id)
    if (!get_image) {
      return response.error(res, 401, 'The _id you provided cannot find any in our collection')
    }
    const delete_image = await utils_image.delete_image_by_id(params._id)
    return response.other(res, 200, { message: 'Successfully deleted a Image', data: delete_image })
  }
}
