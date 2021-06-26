'use strict'

const winston = require('winston')
const { combine, timestamp, prettyPrint } = winston.format


const logger_console = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})


const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
})

module.exports = {
  info: (message, object, activate = process.env.LOGS_CONSOLE) => {
    if (activate === 'TRUE') {
      logger_console.info(message, object)
      return true
    }
    return false
  },
  log: (message, object, level = 'info', activate = process.env.LOGS) => {
    if (activate === 'TRUE') {
      logger.log({ level, message, object })
      return true
    }
    return false
  }
}
