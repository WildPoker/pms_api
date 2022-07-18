/**
* Module for managing the dbs for config
* @module dbs/config
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('../models/' + filename)

module.exports = {
  get_config: () => {
    return model.findOne()
  },
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  }
}
