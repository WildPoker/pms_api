/**
 * Module for managing the dbs for project
 * @module dbs/project
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const libs_dbs = require('@src/libs/dbs')

module.exports = {
  insert: project => {
    return model.create(project)
  },
  get_all_projects: ({ limit, skip, sort, order, joint, count = true }) => {
    // Manage all the matches
    const matches = []

    if (skip && skip !== 1) {
      skip = limit * skip - limit
    }
    const aggregation = libs_dbs.handle_classic_filters_with_count({ matches, order, sort, limit, joint, skip, count })

    return model.aggregate(aggregation)
  },
  get_project_by_id: id => {
    return model.findOne({ _id: id, deleted: false }).populate('progress gallery img')
  },
  update_project_by_id: (_id, update) => {
    console.log(update)
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  delete_project_by_id: _id => {
    return model.findOneAndUpdate({ _id: _id }, { deleted: true }, { new: true })
  }
}
