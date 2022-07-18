/**
 * The endpoint of the express user
 * @module routes/user
 */
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const filename = path.basename(__filename, '.js')
const controller_user = require('../controllers/' + filename)
const { isLoggedIn } = require('../middleware/auth')

/**
 * @route This route will handle getting user
 */
router.get(`/${filename}/:_id?`, isLoggedIn, controller_user.get_user)

module.exports = router
