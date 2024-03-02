const express = require('express')
const router = express.Router()

const {resource_not_found} = require("../../controllers/errors.js")
const {add_params_to_res_locals} = require("../../../../modules/sanitise_tools/index.js") // tools should be @VanillaCX/Tools
const {easter_egg} = require("../../controllers/misc.js")
const {logger} = require("../../../../modules/logger/index.js")

router.param(["name"], add_params_to_res_locals)

// Easter egg page. value of name is available in res.locals.sanitised_params.name
router.get("/easter-egg/:name", easter_egg)

// Log 404
router.use(logger.NotFound)
// No Matches Sending 404
router.use(resource_not_found)

// Log errors
app.use(logger.Error)

// Handle Errors
app.use(error_handler)

module.exports = {router}