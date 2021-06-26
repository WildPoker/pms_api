/**
* The module for managing everything relative to the server
* @module server
*/
'use strict'

const express = require('express')
const body_parser = require('body-parser')
const logger = require('./libs/logger')
const fs = require('fs')

module.exports = {
  create_server: () => {
    return express()
  },
  register_helmet: (server) => {
    server.use(require('helmet')())
  },
  routes: server => {
    const routes = fs.readdirSync('./src/routes')
    const all_routes = routes.map(route => {
      return server.use(`/app`, require(`./routes/${route}`))
    })
    return all_routes
  },
  start: async (name, host, port) => {
    const server = module.exports.create_server()

    module.exports.register_helmet(server)
    module.exports.routes(server)

    server.use(body_parser.json())

    return new Promise((resolve, reject) => {
      server.listen({ port: port, host: host }, (error) => module.exports.callback(error, resolve, reject))
    })
  },
  callback: (error, resolve, reject) => {
    if (error) {
      logger.info('Server fail to start !')
      logger.log('Server fail to start !')
      reject(new Error('Server fail to start !'))
    }
    logger.info('Server Started')
    logger.log('Logger Activated')
    resolve(true)
  }
}
