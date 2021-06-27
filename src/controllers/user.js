/**
* @module Authentification This module will handle the controllers of authentification route
*/

const logger = require('@src/libs/logger')
const utils_user = require('@src/services/utils/user')
const response = require('@src/libs/response')
 
module.exports = {
  /**
  * @route This route will handle the user
  */
  get_user: async (req, res) => {
    logger.log('Getting User')
    const args = req.body
     
    if (args._id) {
      const get_user_by_id = await utils_user.get_user_by_id(args.id)
      if (get_user_by_id.error) return response.error(res, 400, get_user_by_id.error)
    }
    
    return response.other(res, 201, { message: 'Successfully Created a new User' })
  },
 }