const express = require('express')
const app = express()

const catch_all = require("./end-points/catch-all")


/* APP LOCAL VARS */
app.locals.meta = {
    type: "system-api"
}

app.get("/", (req, res, next) => {
    console.log(res.locals.meta)
    res.send("Welcome to the SYSTEM API")
})

app.use("/", catch_all.router)



module.exports = {app}