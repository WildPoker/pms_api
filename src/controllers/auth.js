/**
 * @module Authentification This module will handle the controllers of authentification route
 */

const logger = require('../libs/logger')
const utils_user_type = require('../services/utils/user_type')
const utils_user = require('../services/utils/user')
const utils_auth = require('../services/utils/auth')
const utils_password = require('../services/utils/password')
const response = require('../libs/response')

module.exports = {
  /**
   * This route will handle the registration of new user
   */
  register: async (req, res) => {
    logger.log('New signing to the app')
    const args = req.body
    // Get the deafault user type for the new user
    const default_user_type = await utils_user_type.get_default_user_type()
    args.user_type = default_user_type.id
    // Check if email is valid
    const user = await utils_user.add_user(args)
    if (user.error) {
      return response.error(res, 400, user.error)
    }
    // Create token
    const token = utils_auth.create_token(user)
    return response.other(res, 201, { message: 'Successfully Created a new User', token })
  },
  /**
   * @Route This route will handle the login in of a user
   */
  login: async (req, res) => {
    logger.log('Logging in to the app')
    const args = req.body
    // Check if an account exist for the user
    const user = await utils_user.get_user_by_login(args.login)
    if (!user) {
      return response.error(res, 400, "Email doesn't exist")
    }

    // Check if the password is the correct one
    const is_password_correct = await utils_password.compare_password_hash(args.password, user.password)
    if (!is_password_correct) {
      return response.error(res, 400, 'Incorrect Password')
    }
    // Create token
    const token = utils_auth.create_token(user)
    return response.other(res, 200, { message: 'Successfully Logged In', token })
  }
}
