const {app: system_api} = require("../../services/system-api")
const {app: user_api} = require("../../services/system-api")

const {app: vanilla} = require("../../services/system-api")
const {app: matter} = require("../../services/system-api")
const {app: substance} = require("../../services/system-api")
const {app: surface} = require("../../services/system-api")
const {app: realms} = require("../../services/system-api")

module.exports = {
    vanilla,
    matter,
    substance,
    surface,
    realms ,
    system_api,
    user_api
}