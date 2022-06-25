/**
 * Module for managing the dbs for user
 * @module dbs/user
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const libs_dbs = require('@src/libs/dbs')
const mongoose = require('mongoose')

module.exports = {
  insert: user => {
    return model.create(user)
  },
  get_all_users: ({ limit, skip, sort, order, joint, count = true }) => {
    // Manage all the matches
    const matches = []

    if (skip && skip !== 1) {
      skip = limit * skip - limit
    }

    const unset = ['password']
    const aggregation = libs_dbs.handle_classic_filters_with_count({ matches, order, sort, limit, joint, skip, count, unset })

    return model.aggregate(aggregation)
  },
  get_user_by_id: (id, select) => {
    return model.findOne({ _id: id }).select(select)
  },
  get_user_by_email: email => {
    return model.findOne({ email })
  },
  get_user_by_login: login => {
    return model.findOne({ $or: [{ email: login }] })
  },
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  test_user_by_email: email => {
    return model.exists({ email: email })
  }
}
