/**
 * The endpoint of the express image
 * @module routes/image
 */
'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const filename = path.basename(__filename, '.js')
const controller_image = require('@src/controllers/' + filename)
const { isLoggedIn } = require('@src/middleware/auth')

/**
 * @route This route will handle creating image
 */
router.post(`/${filename}`, isLoggedIn, controller_image.create_image)

/**
 * @route This route will handle getting image
 */
router.get(`/${filename}/:_id?`, isLoggedIn, controller_image.get_image)

/**
 * @route This route will handle deleting a image
 */
router.patch(`/${filename}`, isLoggedIn, controller_image.update_image_by_id)

/**
 * @route This route will handle deleting a image
 */
router.delete(`/${filename}`, isLoggedIn, controller_image.delete_image_by_id)

module.exports = router
