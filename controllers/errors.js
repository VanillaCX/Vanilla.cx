const resource_not_found = (req, res) => {
    const message = "Whoops a daisy !! fromVailla.cx Controller"
    res.render("404", {message})
}

const error_handler = (err, req, res, next) => {
    console.log("Error From VaillaCX: ", err);
    const message = "Nothing much to say, sorry !!"
    res.render("server-error", {message})
}


module.exports = {
    resource_not_found,
    error_handler
}