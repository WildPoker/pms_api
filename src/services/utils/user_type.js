/**
* The utils function for managing the type of user
* @module utils/user_type
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('../../dbs/' + filename)
const utils_config = require('./config')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Return the user_type by the name
  * @param {String} name The name of the user type searched
  * @return {user_type} The user type found
  **/
  get_user_type_by_id: id => {
    return dbs.get_user_type_by_id({ _id: id })
  },
  /**
  * Return the user_type by the name
  * @param {String} name The name of the user type searched
  * @return {user_type} The user type found
  **/
  get_user_type_by_name: name => {
    if (!name) {
      throw new Error('The name cannot be null.')
    }
    const uppercase_name = name.toUpperCase()
    return dbs.get_user_type_by_name(uppercase_name)
  },
  /**
  * Return the user_type of the manager
  * @return {user_type} The user type found
  **/
  get_manager_user_type: async () => {
    const user_type = dbs.get_user_type_by_name('MANAGER')
    if (!user_type) {
      throw new Error('The user type (MANAGER) has not been defined.')
    }

    return user_type
  },
  /**
  * Get the default user type
  **/
  get_default_user_type: async () => {
    const config = await utils_config.get_config()
    const default_user_type = config.default_user_type
    return module.exports.get_user_type_by_id(default_user_type)
  }
}
