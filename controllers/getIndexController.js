const getIndexController = async (req, res) => {
    res.render("index", { user: res.locals.currentUser })
}

module.exports = getIndexController;