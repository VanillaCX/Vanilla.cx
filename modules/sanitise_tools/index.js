const {Safe} = require("@VanillaCX/Schema")

const add_params_to_res_locals = (req, res, next, value, key) => {
    // Sanitise input
    const {valid, sanitised, error} = Safe.test(value)

    if (!res.locals.sanitised_params) {
        res.locals.sanitised_params = {}
    }

    res.locals.sanitised_params[key] = (valid) ? sanitised : null;

    next()
}

module.exports = { add_params_to_res_locals }