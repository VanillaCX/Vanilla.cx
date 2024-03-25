const express = require('express')
const router = express.Router()

// Middleware to Sanitise URL params
const {add_params_to_res_locals} = require("../../../../modules/sanitise_tools")

// Controller for Matter
const controller = require("../../controllers/matter")

// Sanitise Parameters and add to res.locals.sanitised_parameters
router.param("matter", add_params_to_res_locals)

// Route Controllers
router.get("/:matter", controller.getMatter)

router.get("/", controller.listMatter)

module.exports = router