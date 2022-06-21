/**
 * The utils function for managing the type of user
 * @module utils/progress
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const Progress = require('@src/models/' + filename)

/**
 * Manage the utils function for the progress
 **/
module.exports = {
  insert_progress: args => {
    const progress = new Progress(args)
    return dbs.insert(progress)
  },
  get_progress_by_id: id => {
    return dbs.get_progress_by_id({ _id: id })
  },
  delete_progress_by_id: id => {
    return dbs.delete_progress_by_id({ _id: id })
  },
  update_progress_by_id: (id, update) => {
    return dbs.update_progress_by_id({ _id: id, update })
  },
  get_all_progress: () => {
    return dbs.get_all_progress({ _id: id })
  }
}
