/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('@src/libs/logger')
const utils_user = require('@src/services/utils/user')
const utils_auth = require('@src/services/utils/auth')
const response = require('@src/libs/response')

module.exports = {
  /**
   * @route This route will handle the user
   */
  get_user: async (req, res) => {
    logger.log('Getting User')

    const params = req.query
    const remove_fields = ['-password']
    if (!params._id) {
      const verify_token = await utils_auth.verify_token_from_header(req.headers)
      if (verify_token.error) {
        return response.error(res, 401, verify_token.error)
      }
      // Get the user
      const user = await utils_user.get_user_by_id(verify_token._id, remove_fields)
      return response.other(res, 201, { message: 'Successfully get a User', data: user })
    }
    const get_user_by_id = await utils_user.get_user_by_id(params._id, remove_fields)
    if (get_user_by_id.error) return response.error(res, 400, { message: 'Please provide an _id of the user' })

    return response.other(res, 201, { message: 'Successfully get a User', data: get_user_by_id })
  }
}
