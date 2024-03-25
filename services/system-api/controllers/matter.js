
const {ResourceNotFound} = require("../../../modules/errors")


class Matter {
    static get({account, matter}){
        console.log("GET MATTER NOW");
        const result = {
            meta: {
                type: "matter",
                account,
                matter,
            },
            title: "Lee",
            name: "Bowyer"
        };

        if(!result) {
            throw new ResourceNotFound({
                details: {
                    account,
                    matter,
                }
            })
        }

        return result
    }

    static list({account}){
        console.log("LIST MATTER NOW");
        const result = ["lkjlkjkljlk", "lkjlkjlkjklj", "hghghghghgh", "fgfgfgfgfg"];

        if(!result) {
            return new ResourceNotFound({
                details: {
                    account,
                }
            })
        }

        return result
    }


}


const getMatter = (req, res, next) => {
    // GET MATTER / VIEW IN ACCOUNT
    const matter = Matter.get({
        account: res.locals.sanitised_params.account,
        matter: res.locals.sanitised_params.matter
    })
    res.json(matter)

}

const listMatter = (req, res, next) => {
    // LIST ALL MATTER IN ACCOUNT
    const list = Matter.list({
        account: res.locals.sanitised_params.account,
    })
    res.json(list)
}



module.exports = {getMatter, listMatter}