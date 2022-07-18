/**
 * The endpoint of the express progress
 * @module routes/progress
 */
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const filename = path.basename(__filename, '.js')
const controller_progress = require('../controllers/' + filename)
const { isLoggedIn } = require('../middleware/auth')

/**
 * @route This route will handle creating progress
 */
router.post(`/${filename}`, isLoggedIn, controller_progress.create_progress)

/**
 * @route This route will handle getting progress
 */
router.get(`/${filename}/:_id?`, isLoggedIn, controller_progress.get_progress)

/**
 * @route This route will handle deleting a progress
 */
router.patch(`/${filename}`, isLoggedIn, controller_progress.update_progress_by_id)

/**
 * @route This route will handle deleting a progress
 */
router.delete(`/${filename}`, isLoggedIn, controller_progress.delete_progress_by_id)

module.exports = router
