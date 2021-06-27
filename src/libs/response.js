/**
* Set of global functions or response about response
* @module libs/response
*/
'use strict'

module.exports = {
  /**
   * @param {Function} res - The response for express
   */
  fatal: (res) => {
    res.status(500).json({ message: 'Something Went Wrong' })
  },
  /**
   * @param {Function} res - The response for express
   */
  error: (res, status, message) => {
    res.status(status).json({ message })
  },
  /**
   * @param {Object}  
   */
  info: (res, status, message) => {
    res.status(status).json({ message })
  },
  /**
   * @param {Object}
   */
  other: (res, status, args) => {
    res.status(status).json(args)
  }
}
