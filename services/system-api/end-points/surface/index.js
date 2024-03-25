const express = require('express')
const router = express.Router()

// Middleware to Sanitise URL params
const {add_params_to_res_locals} = require("../../../../modules/sanitise_tools")

// Controller for Matter
const controller = require("../../controllers/surface")

// Sanitise Parameters and add to res.locals.sanitised_parameters
router.param("surface", add_params_to_res_locals)
router.param("view", add_params_to_res_locals)

// Route Controllers
router.get("/:surface/:view", controller.getSurface)

router.get("/:surface", controller.getSurface)

router.get("/", controller.listSurface)

module.exports = router