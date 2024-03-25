const {ResourceNotFound} = require("../../../modules/errors")


class User {
    static getAccount({account} = {}) {
        const data = {
            meta: {
                type: "account",
                account
            }
        }

        if(!data){
            throw new ResourceNotFound({
                details: {
                    info: "User Account doesnt exist",
                    account,
                }
            })
        }

        return data
    }

    static exists({account} = {}){
        const exists = true;

        if(!exists) {
            throw new ResourceNotFound({
                details: {
                    info: "User Account doesnt exist",
                    account,
                }
            })
        }

        return exists
    }
}

const getAccount = (req, res, next) => {
    // LIST ALL MATTER IN ACCOUNT
    try {
        const account = User.getAccount({
            account: res.locals.sanitised_params.account,
        })
        res.json(account)
    } catch(e) {
        console.log("HANDLE RROR", e);
        next(e)
    }
}

const home = (req, res, next) => {
    try {
        const exists = User.exists({
            account: res.locals.sanitised_params.account,
        })

        const account = res.locals.sanitised_params.account;
        
        const services = [{
            title: "Substance",
            endPoints: [{
                name: "List",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/substance` 
            },{
                name: "Get",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/substance/{{id}}` 
            },{
                name: "Create",
                method: "PUT",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/substance/{{id}}` 
            }]
        },{
            title: "Matter",
            endPoints: [{
                name: "List",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/matter` 
            },{
                name: "Get",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/matter/{{id}}` 
            }]
        },{
            title: "Surface",
            endPoints: [{
                name: "List",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/surface` 
            },{
                name: "Get default View",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/surface/{{id}}` 
            },{
                name: "Get View",
                method: "GET",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fugit labore perspiciatis ratione perferendis illum odit a cupiditate qui, dolorem velit autem nemo recusandae accusantium pariatur necessitatibus et possimus corporis?",
                url: `http://api.vanilla.cx/${account}/surface/{{id}}/{{view}}` 
            }]
        }]
    
        services.forEach((service) => {
            console.log(service)
        })
        res.render("api-builder", {services})
    } catch(e) {
        console.log("HANDLE RROR", e);
        next(e)
    }


    
}

const exists = (req, res, next, value, key) => {
    const exists = User.exists({
        account: value,
    })
    
    next()
}



module.exports = {getAccount, home, exists}