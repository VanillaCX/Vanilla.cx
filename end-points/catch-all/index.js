const express = require('express')
const router = express.Router()

const {resource_not_found, error_handler} = require("../../controllers/errors.js")
const {logger} = require("../../modules/logger/index.js")

// Log 404
router.use(logger.NotFound)

// No Matches Sending 404
router.use(resource_not_found)

// Log errors
router.use(logger.Error)

// Handle Errors
router.use(error_handler)

module.exports = router