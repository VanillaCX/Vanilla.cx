const fs = require('fs');
const path = require('path');
const error_log_path = path.resolve(__dirname, '../logs/error.log');

const resource_not_found = (req, res) => {
    const message = "Whoops a daisy !!"
    res.render("404", {message})
}

const error_handler = (err, req, res, next) => {
    console.log("Error: ", err);
    const message = "Nothing much to say, sorry !!"
    res.render("server-error", {message})
}


module.exports = {
    resource_not_found,
    error_handler
}