const express = require('express')
const router = express.Router()

// No Matches Sending 404
router.use((req, res) => {
    res.send("Sorry, 404")
})

module.exports = router