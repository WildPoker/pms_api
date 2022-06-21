/**
 * The utils function for managing the user
 * @module utils/user
 */
'use strict'

const path = require('path')
const utils_password = require('@src/services/utils/password')
const utils_email = require('@src/services/utils/email')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const User = require('@src/models/' + filename)

/**
 * Manage the mutations for the question model
 **/
module.exports = {
  /**
   * @param {Object} args - Containing the info of the user
   */
  add_user: async args => {
    //Check if the email is a real one
    const validate_email = utils_email.check_email(args.email)
    if (!validate_email) return { error: 'The email you provided is invalid' }
    // Check if a user already exist with the email provided
    const is_email_already_exist = await module.exports.is_user_exist_by_email(args.email)
    if (is_email_already_exist) return { error: 'The email you provided is already used' }
    // Check if the password is strong
    const check_password = await utils_password.check_password_strong_enough(args.password)
    if (check_password.error) return check_password

    // Hash the password
    args.password = await utils_password.hash_password(args.password)
    const user = new User(args)
    return dbs.insert(user)
  },
  /**
   * Get an user by id
   * @param {String} id The id of the user to search
   * @return {Object} The user found or null
   **/
  get_user_by_id: async (id, select) => {
    // Get the user
    const user = await dbs.get_user_by_id(id, select)
    if (user === null) {
      return { error: 'The id you provided is invalid' }
    }
    return user
  },
  /**
   * Get an user by username or email
   * @param {String} login The username or email to search
   * @return {Object} The user found or null
   **/
  get_user_by_login: async login => {
    return dbs.get_user_by_login(login)
  },
  /**
   * Test the email if a user exist in the db with this email
   * @param {String} email The email to test
   * @return {boolean} True if the user exist or else False
   **/
  is_user_exist_by_email: async email => {
    return dbs.test_user_by_email(email)
  },
  /**
   * @returns Drop the collection of user
   */
  drop_collection: async () => {
    return await dbs.drop_collection()
  },
  /**
   * Test if the user is an instance of user
   * @param {Object} user The object user to test
   * @return {boolean} True if it's an object user or else false
   **/
  is_instanceof_user: user => {
    return user instanceof User
  }
}
