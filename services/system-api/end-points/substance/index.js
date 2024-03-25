const express = require('express')
const router = express.Router()

// Middleware to Sanitise URL params
const {add_params_to_res_locals} = require("../../../../modules/sanitise_tools")

// Controller for Matter
const controller = require("../../controllers/substance")

// Sanitise Parameters and add to res.locals.sanitised_parameters
router.param("substance", add_params_to_res_locals)

// Route Controllers
router
    .get("/:substance", controller.getSubstance)
    .put("/:substance", controller.createSubstance)

router.get("/", controller.listSubstance)

module.exports = router