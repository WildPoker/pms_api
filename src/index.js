'use strict'

 require('module-alias/register')
 const utils = require('./libs/utils')
 const mode = utils.mode(process.env.NODE_ENV)
 require('dotenv').config({ path: './env/.env.' + mode })
 const server = require('./server')
 const database = require('./database')
 
const start = async () => {
  database.mongoose_connect(process.env.DB_NAME, process.env.DB_URI_DATA, process.env.DB_USER_DATA, process.env.DB_PASS_DATA)
  return await server.start(process.env.API_NAME, process.env.HOST, process.env.PORT)
}

start()