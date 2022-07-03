/**
 * Module for managing the dbs for progress
 * @module dbs/progress
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const libs_dbs = require('@src/libs/dbs')

module.exports = {
  insert: progress => {
    return model.create(progress)
  },
  get_all_progresss: ({ limit, skip, sort, order, joint, count = true }) => {
    // Manage all the matches
    const matches = []

    if (skip && skip !== 1) {
      skip = limit * skip - limit
    }
    const aggregation = libs_dbs.handle_classic_filters_with_count({ matches, order, sort, limit, joint, skip, count })

    return model.aggregate(aggregation)
  },
  get_progress_by_id: id => {
    return model.findOne({ _id: id, deleted: false }).populate({ path: 'gallery progress' })
  },
  get_progress_by_list_of_ids_and_step: (ids, step) => {
    return model.find({ _id: { $in: ids }, step: step })
  },
  update_progress_by_id: (_id, update) => {
    console.log(update)
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  delete_progress_by_id: _id => {
    return model.findOneAndUpdate({ _id: _id }, { new: true })
  }
}
