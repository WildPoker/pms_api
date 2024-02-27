/**
 * The endpoint of the express project
 * @module routes/project
 */
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const upload = require('../middleware/upload')
const filename = path.basename(__filename, '.js')
const controller_project = require('../controllers/' + filename)
const { isLoggedIn } = require('../middleware/auth')

/**
 * @route This route will handle creating project
 */
// router.post(`/${filename}`, isLoggedIn, upload.fields([{ name: 'img', maxCount: 1}, { name: 'gallery', maxCount: 12}]), controller_project.create_project)
router.post(`/${filename}`, isLoggedIn, controller_project.create_project)

/**
 * @route This route will handle getting project
 */
router.get(`/${filename}/:_id?`, isLoggedIn, controller_project.get_project)

/**
 * @route This route will handle updating a project
 */
router.patch(`/${filename}`, isLoggedIn, controller_project.update_project_by_id)

/**
 * @route This route will handle proceeding a project progress
 */
router.patch(`/${filename}/:_id?`, isLoggedIn, controller_project.proceed_next_progress)

/**
 * @route This route will handle deleting a project
 */
router.delete(`/${filename}`, isLoggedIn, controller_project.delete_project_by_id)

module.exports = router
