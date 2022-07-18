/**
 * The module for managing everything relative to the server
 * @module server
 */
'use strict'

const express = require('express')
const logger = require('./libs/logger')
const fs = require('fs')
const path = require('path')

module.exports = {
  create_server: () => {
    return express()
  },
  register_helmet: server => {
    server.use(require('helmet')())
  },
  register_body_parser: server => {
    const bodyParser = require('body-parser')
    const cors = require('cors')
    server.use(cors())
    server.use(bodyParser({ extended: true }))
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
  },
  routes: server => {
    const routes = fs.readdirSync('./src/routes')
    const all_routes = routes.map(route => {
      route = path.basename(route, '.js')
      return server.use(`/app`, require(`./routes/${route}`))
    })
    return all_routes
  },
  start: async (name, host, port) => {
    const server = module.exports.create_server()

    module.exports.register_body_parser(server)
    module.exports.register_helmet(server)
    try {
      module.exports.routes(server)
    } catch (error) {
      console.log(error)
    }
    return new Promise((resolve, reject) => {
      server.listen(port, error => module.exports.callback(error, resolve, reject, port))
    })
  },
  callback: (error, resolve, reject, port) => {
    if (error) {
      logger.info('Server fail to start !')
      logger.log('Server fail to start !')
      reject(new Error('Server fail to start !'))
    }
    logger.info('Server Started at Port ' + port)
    logger.log('Logger Activated')
    resolve(true)
  }
}
