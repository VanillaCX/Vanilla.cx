require('dotenv').config();

const express = require('express')
const app = express()

const catch_problems = require("./end-points/catch-problems")

const {logger} = require("../../modules/logger")
const {add_params_to_res_locals} = require("../../modules/sanitise_tools")

// Access Logger
app.use(logger.Access)

// Sanitise Parameters and add to res.locals.sanitised_parameters
app.param(["test", "inner"], add_params_to_res_locals)
//app.param(["user"], find_user)
//app.param(["matter"], get matter)
//app.param(["substance"], get substance)

// Set View Engine
app.set('view engine', 'ejs'); 
app.set("views", "./services/system-api/views")

// Create static directory
//app.use('/static', express.static(path.join(__dirname, 'public')))

// Set App variables
app.locals.title = process.env.SERVER_NAME
app.locals.server_admin_email = process.env.SERVER_ADMIN_EMAIL
app.locals.bug_reports_email = process.env.BUG_REPORTS_EMAIL
app.locals.software_version = process.env.SOFTWARE_VERSION

// Put routers here ...
app.get("/", (req, res, next) => {
    res.render("home")
})

// Handles Errors and 404s
app.use("/", catch_problems)

module.exports = {app}