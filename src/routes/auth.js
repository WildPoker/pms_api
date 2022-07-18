/**
 * The endpoint of the express authentification
 * @module routes/authentification
 */
'use strict'

const express = require('express')
const router = express.Router()
const controller_auth = require('../controllers/auth')

/**
 * @route This route will handle register
 */
router.post('/authentification/register', controller_auth.register)
/**
 * @route This route will handle login
 */
router.post('/authentification/login', controller_auth.login)

 
module.exports = router
