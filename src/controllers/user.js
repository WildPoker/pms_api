/**
 * @module User This module will handle the controllers of user route
 */

const logger = require('../libs/logger')
const utils_user = require('../services/utils/user')
const utils_filter = require('../services/utils/filter')
const response = require('../libs/response')
const mongoose = require('mongoose')
const User = require('../models/user')

module.exports = {
  /**
   * @route This route will handle the user
   */
  get_user: async (req, res) => {
    logger.log('Getting User')

    const args = req.query
    const params = req.params
    const remove_fields = ['-password']
    if (params._id !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(params._id)) return response.error(res, 400, { message: 'Please provide a valid mongo _id' })
      const get_user_by_id = await utils_user.get_user_by_id(params._id, remove_fields)
      console.log(get_user_by_id)
      if (get_user_by_id.error) return response.error(res, 400, { message: 'Please provide an _id of the user' })

      return response.info(res, 201, { message: 'Successfully returned a user', data: get_user_by_id })
    }
    // Check type
    const limit = utils_filter.handle_limit_argument(args.limit)
    const skip = utils_filter.handle_skip_argument(args.skip)
    const sort = utils_filter.handle_sort_argument(args.sort, User)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)

    const users = await utils_user.get_all_users({ limit, skip, sort, order, joint })
    return response.info(res, 201, { message: 'Successfully returned a user', data: users[0] })
  }
}
