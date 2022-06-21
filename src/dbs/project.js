/**
 * Module for managing the dbs for project
 * @module dbs/project
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const libs_dbs = require('@src/libs/dbs')
const mongoose = require('mongoose')

module.exports = {
  insert: project => {
    return model.create(project)
  },
  get_all_project: ({ limit, sort, order, joint, count }) => {
    // Manage all the matches
    const matches = []

    if (project_ID) {
      const ids = project_ID.map(id => mongoose.Types.ObjectId(id))
      matches.push({ _id: { $in: ids } })
    }

    if (projectname !== null) {
      matches.push({ projectname: { $regex: projectname } })
    }

    const aggregation = libs_dbs.handle_classic_filters({ matches, order, sort, limit, joint })

    return model.aggregate(aggregation)
  },
  get_project_by_id: id => {
    return model.findOne({ _id: id, deleted: false })
  },
  update_project_by_id: (_id, update) => {
    console.log(update)
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  delete_project_by_id: _id => {
    return model.findOneAndUpdate({ _id: _id }, { deleted: true }, { new: true })
  }
}
