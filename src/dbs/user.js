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
  get_all_users: ({ limit, sort, order, joint, username, email, email_list, user_ID }) => {
    // Manage all the matches
    const matches = []

    if (user_ID) {
      const ids = user_ID.map(id => mongoose.Types.ObjectId(id))
      matches.push({ _id: { $in: ids } })
    }

    if (username !== null) {
      matches.push({ username: { $regex: username } })
    }
    if (email !== null) {
      matches.push({ email: { $regex: email } })
    }
    if (email_list !== null) {
      matches.push({ email: { $in: email_list } })
    }

    const aggregation = libs_dbs.handle_classic_filters({ matches, order, sort, limit, joint })

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
