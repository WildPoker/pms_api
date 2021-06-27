/**
* Module for managing the dbs for user_type
* @module dbs/user_type
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  get_user_type_by_id: id => {
    return model.findOne({ _id: id })
  },
  get_user_type_by_name: name => {
    return model.findOne({ name: name })
  }
}
