require('dotenv').config({ path: './apps/system-api/.env', override: true })

const express = require('express')
const app = express()

const catch_all = require("./end-points/catch-all")


/* APP LOCAL VARS */
app.locals.meta = {
    type: "system-api"
}

app.get("/", (req, res, next) => {
    console.log("here", res.locals.meta)
    res.render("home")
})

app.use("/", catch_all.router)



module.exports = {app}