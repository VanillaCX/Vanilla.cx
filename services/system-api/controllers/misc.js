const easter_egg = (req, res, next) => {
    try {
        //throw new Error("testing to see if error handlers work")
        res.render("easter-egg")
    } catch(e) {
        next(e)
    }
}



module.exports = {easter_egg}