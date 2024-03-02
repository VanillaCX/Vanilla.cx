const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log("Request Slipped through SYSTEM API nets, looking for an edge case before returning 404")    
    
    next()
})


// No Matches Sending 404
router.use((req, res) => {
    res.send("Sorry, 404")
})

module.exports = {router}