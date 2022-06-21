/**
 * Module for managing the dbs for progress
 * @module dbs/progress
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const libs_dbs = require('@src/libs/dbs')
const mongoose = require('mongoose')

module.exports = {
  insert: progress => {
    return model.create(progress)
  },
  get_all_progress: ({ limit, sort, order, joint, count }) => {
    // Manage all the matches
    const matches = []

    const aggregation = libs_dbs.handle_classic_filters({ matches, order, sort, limit, joint })

    return model.aggregate(aggregation)
  },
  get_progress_by_id: id => {
    return model.findOne({ _id: id })
  },
  update_progress_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  delete_progress_by_id: _id => {
    return model.findOneAndUpdate({ _id: _id }, { deleted: true }, { new: true })
  }
}
