/**
 * The endpoint of the express project
 * @module routes/project
 */
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const filename = path.basename(__filename, '.js')
const controller_project = require('@src/controllers/' + filename)
const { isLoggedIn } = require('@src/middleware/auth')

/**
 * @route This route will handle creating project
 */
router.post(`/${filename}`, isLoggedIn, controller_project.create_project)

/**
 * @route This route will handle getting project
 */
router.get(`/${filename}`, isLoggedIn, controller_project.get_project_by_id)

/**
 * @route This route will handle deleting a project
 */
router.patch(`/${filename}`, isLoggedIn, controller_project.update_project_by_id)

/**
 * @route This route will handle deleting a project
 */
router.delete(`/${filename}`, isLoggedIn, controller_project.delete_project_by_id)

module.exports = router
