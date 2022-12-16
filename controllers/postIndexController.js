require("dotenv").config();
const User = require("../models/user");

const postIndexController = async (req, res, next) => {
    if (req.body.secret === process.env.SECRET_CODE && req.user) {
        const user = new User({
            _id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            username: req.user.username,
            password: req.user.password,
            membership: true,
            admin: false,
        });

        console.log(user);

        User.findByIdAndUpdate(req.user._id, user, {}, (err, updatedUser) => {
            // If an error occurs...
            if (err) return next(err);
            console.log(updatedUser);
            // Successful: redirect to book detail page.
            res.redirect("/");
        });
    }
};

module.exports = postIndexController;
