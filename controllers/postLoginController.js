const passport = require("../passport");

const postLoginController = (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      })
}

module.exports = postLoginController;