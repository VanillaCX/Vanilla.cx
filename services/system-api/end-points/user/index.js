const express = require('express')
const router = express.Router()

// Controller for Matter
const controller = require("../../controllers/user")

// Route Controllers
router.get("/account", controller.getAccount)

router.get("/", controller.home)

module.exports = router