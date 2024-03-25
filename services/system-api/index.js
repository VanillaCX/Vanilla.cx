require('dotenv').config({ path: './services/system-api/.env', override: true })

const express = require('express')
const app = express()

const user = require("./end-points/user")
const {exists: check_user_exists} = require("./controllers/user")

const serviceRouters = {
    matter: require("./end-points/matter"),
    substance: require("./end-points/substance"),
    surface: require("./end-points/surface")
}

const {logger} = require("../../modules/logger")
const {add_params_to_res_locals} = require("../../modules/sanitise_tools")

// Access Logger
app.use(logger.Access)

// Sanitise Parameters and add to res.locals.sanitised_parameters
app.param("account", check_user_exists)
app.param(["service", "account"], add_params_to_res_locals)

// Set View Engine
app.set('view engine', 'ejs'); 
app.set("views", "./services/system-api/views")

// Set static directory
app.use(express.static("./services/system-api/public"))

// Set App variables
app.locals.title = process.env.SERVER_NAME
app.locals.server_admin_email = process.env.SERVER_ADMIN_EMAIL
app.locals.bug_reports_email = process.env.BUG_REPORTS_EMAIL
app.locals.software_version = process.env.SOFTWARE_VERSION

// ROUTES FOR USER
app.use("/:account", (req, res, next) => {
    return user(req, res, next)
})

// SERVICE ROUTE DISPATCHER
app.use("/:account/:service", (req, res, next) => {
    const service = res.locals.sanitised_params.service

    console.log("SERVICE: ", service)

    if (service in serviceRouters) {
        return serviceRouters[service](req, res, next)
    }

    next()
    
})



const {api_error_handler, api_resource_not_found} = require("../../modules/errors")

app.use(api_resource_not_found)
app.use(api_error_handler)

module.exports = {app}