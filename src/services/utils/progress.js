/**
 * The utils function for managing the type of user
 * @module utils/progress
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('../../dbs/' + filename)
const Progress = require('../../models/' + filename)

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
  get_progress_by_list_of_ids_and_step: (ids, step) => {
    return dbs.get_progress_by_list_of_ids_and_step(ids, step)
  },
  get_all_progresss: async ({ limit = 10, skip = 0, sort, order, joint }) => {
    return await dbs.get_all_progresss({ limit, skip, sort, order, joint })
  },
  delete_progress_by_id: id => {
    return dbs.delete_progress_by_id({ _id: id })
  },
  update_progress_by_id: (id, update) => {
    return dbs.update_progress_by_id(id, update)
  },
  get_all_progress: () => {
    return dbs.get_all_progress({ _id: id })
  }
}
