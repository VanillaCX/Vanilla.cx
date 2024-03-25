require('dotenv').config();

const express = require('express')
const helmet = require("helmet");
const gateway = require("./modules/gateway")
const catch_all = require("./end-points/catch-all")

const dev_machine = process.env.DEV_MACHINE || false
const port = process.env.PORT || 8081;

// Create Proxy
const proxy = express()

// Set Helmet usage for security
//proxy.use(helmet());

// Variables for use in templates
proxy.locals.dev_machine = dev_machine
proxy.locals.title = process.env.SERVER_NAME
proxy.locals.server_admin_email = process.env.SERVER_ADMIN_EMAIL
proxy.locals.bug_reports_email = process.env.BUG_REPORTS_EMAIL
proxy.locals.software_version = process.env.SOFTWARE_VERSION

// Remove fingerprinting of the Server Software
proxy.disable('x-powered-by');

// Directory for serving static files
proxy.use(express.static('public'))

// Set EJS as templating engine  
proxy.set('view engine', 'ejs'); 

// Parse application/x-www-form-urlencoded
proxy.use(express.urlencoded({ extended: false }));

// Parse application/json
proxy.use(express.json());

// Log request
proxy.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path)

    next()
})

// Handles errors
proxy.use((err, req, res, next) => {
    console.log("error caught by PROXY:", err)
})

// Route traffic to relevant service
proxy.use(gateway)

// Only Caught if NOT redirected by gateway

// Catch all Router
proxy.use(catch_all)

// Start Server
proxy.listen(port, () => console.log(`Proxy Server is listening on port: ${port}`));