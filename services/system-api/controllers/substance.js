const {Schema, ShortText, Squid, Stamp} = require("@VanillaCX/Schema")

const {ResourceNotFound, SchemaError} = require("../../../modules/errors")


class Substance {
    static metaSchema = new Schema({
        definition: {
            account: {type: ShortText, required: true},
            substance: {type: ShortText, required: true},
            created: {type: Stamp, required: true}
        }
    })

    static create({account, substance, definition}) {
        let new_substance = {}
        const meta = {
            account,
            substance,
            created: Stamp.now()
        }

        const metaTest = Substance.metaSchema.test(meta)

        if(!metaTest.valid) {
            throw new SchemaError({details: {fieldErrors: metaTest.errors}})
        }

        new_substance.meta = metaTest.sanitised


        return new_substance
    }

    static get({account, substance}){
        const result = {
            meta: {
                type: "substance",
                account,
                substance,
            },
            title: "Lee",
            name: "Bowyer"
        };

        if(!result) {
            throw new ResourceNotFound({
                details: {
                    account,
                    substance,
                }
            })
        }

        return result
    }

    static list({account}){
        const result = ["lkjlkjkljlk", "lkjlkjlkjklj", "hghghghghgh", "fgfgfgfgfg"];

        if(!result) {
            throw new ResourceNotFound({
                details: {
                    account,
                }
            })
        }

        return result
    }

    


}


const getSubstance = (req, res, next) => {
    // GET MATTER / VIEW IN ACCOUNT
    const substance = Substance.get({
        account: res.locals.sanitised_params.account,
        substance: res.locals.sanitised_params.substance,
    })
    res.json(substance)

}

const listSubstance = (req, res, next) => {
    // LIST ALL MATTER IN ACCOUNT
    const list = Substance.list({
        account: res.locals.sanitised_params.account,
    })
    res.json(list)

    
}

const createSubstance = (req, res, next) => {
    console.log("REQUEST TO CREATE NEXT NEW", req.body);

    const account = res.locals.sanitised_params.account;
    const substance = res.locals.sanitised_params.substance;
    const definition = {...req.body};

    const new_substance = Substance.create({
        account,
        substance,
        definition
    })

    res.json({
        status: {
            code: 201,
            location: `http://api.vanilla.cx/${account}/substance/${account}/${substance}`
        },
        response: new_substance
    })
}



module.exports = {getSubstance, listSubstance, createSubstance}