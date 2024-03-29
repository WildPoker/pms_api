/**
* The module for managing everything relative to the database
* @module database
*/
'use strict'

const mongoose = require('mongoose')
const mongo_uri_builder = require('mongo-uri-builder')

module.exports = {
  mongoose_connect: (db_name, db_uri, db_username, db_password) => {
    mongoose.connect(process.env.DB_URI_DATA, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  }
}
