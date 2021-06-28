/**
 * The endpoint of the express authentification
 * @module routes/authentification
 */
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const filename = path.basename(__filename, '.js')
const controller_auth = require('@src/controllers/' + filename)

/**
 * @route This route will handle register
 */
router.post('/authentification/register', controller_auth.register)
/**
 * @route This route will handle login
 */
router.post('/authentification/login', controller_auth.login)

 
module.exports = router
