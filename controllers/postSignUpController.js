const User = require("../models/user");

const postSignUpController = (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        membership: true
      })
      user.save((err) => {
        if (err) {
            return next(err);
        }
      });
      res.redirect("/")
}

module.exports = postSignUpController;