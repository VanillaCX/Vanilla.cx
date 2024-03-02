require('dotenv').config();

const fs = require('fs');


class Logger {
    #error_log_file;
    #access_log_file;
    #log_errors;
    #log_access;

    constructor({error_log_file, access_log_file, log_errors, log_access}){
        this.#error_log_file = error_log_file;
        this.#access_log_file = access_log_file;
        this.#log_errors = log_errors;
        this.#log_access = log_access;
    }

    Error = (err, req, res, next) => {
        if(this.#log_errors){
            const log_message = (`${new Date().toISOString()} - ${req.method} - ${req.url} - ${req.path}\n${err.stack}\n\n`)
            
            fs.appendFile(this.#error_log_file, log_message, (log_error) => {
                if (log_error) console.error('Access logging failed:', log_error);
            });
        }
    
        next(err)
    }

    Access = (req, res, next) => {
        if (this.#log_access) {
            const log_message = (`${new Date().toISOString()} - ${req.method} - ${req.url} - ${req.path}\n\n`)
            
            fs.appendFile(this.#access_log_file, log_message, (log_error) => {
                if (log_error) console.error('Access logging failed:', log_error);
            });
        }
    
        next()
    }

    NotFound = (req, res, next) => {
        if (this.#log_access) {
            const log_message = (`${new Date().toISOString()} - 404 - Not Found - ${req.method} - ${req.url} - ${req.path}\n\n`)
            
            fs.appendFile(this.#access_log_file, log_message, (log_error) => {
                if (log_error) console.error('Access logging failed:', log_error);
            });
        }
    
        next()
    }
}

const logger = new Logger({
    error_log_file: process.env.ERROR_LOG_FILE,
    access_log_file: process.env.ACCESS_LOG_FILE,
    log_errors: process.env.LOG_ERRORS,
    log_access: process.env.LOG_ACCESS
})

module.exports = {logger}