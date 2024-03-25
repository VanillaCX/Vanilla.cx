class ResourceNotFound extends Error {
    constructor({message = "Resource Not Found", details = {}} = {}){
        super(message)
        this.name = this.constructor.name;
        this.code = 404
        this.details = details
    }

}

class SchemaError extends Error {
    constructor({message = "Schema Syntax Error", details = {}} = {}){
        super(message)
        this.name = this.constructor.name;
        this.code = 400
        this.details = details
    }

}

class InvalidRequestError extends Error {
    constructor({message = "Invalid Request", details = {}} = {}){
        super(message)
        this.name = this.constructor.name;
        this.code = 400
        this.details = details
    }

}

const api_resource_not_found = (req, res) => {
    throw new InvalidRequestError()

}

const api_error_handler = (err, req, res, next) => {
    const error_message = {
        error: {
            message: err.message,
            code: err.code,
        }
    }

    switch(err.code) {
        case 404:
            error_message.error.detail = {
                resource: req.url,
                ...err.details
            }
            break;
        case 400:
                error_message.error.detail = {
                    resource: req.url,
                    ...err.details
                }
                break;
    }

    res.status(err.code)
    res.json(error_message)
}


module.exports = {
    ResourceNotFound,
    InvalidRequestError,
    api_resource_not_found,
    api_error_handler,
    SchemaError
}