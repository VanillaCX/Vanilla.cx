
const {ResourceNotFound} = require("../../../modules/errors")


class Surface {
    static get({account, surface, view = "default"}){
        console.log({account, surface})
        const result = {
            meta: {
                type: "surface",
                account,
                surface,
                view
            },
            title: "Lee",
            name: "Bowyer"
        };

        if(!result) {
            throw new ResourceNotFound({
                details: {
                    account,
                    surface,
                    view
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


const getSurface = (req, res, next) => {
    const surface = Surface.get({
        account: res.locals.sanitised_params.account,
        surface: res.locals.sanitised_params.surface,
        view: res.locals.sanitised_params.view
    })
    res.json(surface)

}

const listSurface = (req, res, next) => {
    const list = Surface.list({
        account: res.locals.sanitised_params.account,
    })
    res.json(list)
}



module.exports = {getSurface, listSurface}