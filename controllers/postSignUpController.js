const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const postSignUpController = (req, res, next) => {
    // Sanitize form inputs
    body("first_name", "First Name should not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape();

    body("last_name", "Last Name should not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape();

    body("username", "Username should not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape();

    body("password", "Password should not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape();

    body("confirm_password", "Password confirmation should not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape();

    // Process errors after sanitization/validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return console.log(errors);
    }

    if (req.body.password === req.body.confirm_password) {
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            membership: false,
        });
        user.save((err) => {
            if (err) {
                return next(err);
            }
        });
        res.redirect("/");
    } else {
        res.status(403).send("Passwords do not match...");
        next(err);
    }
};

module.exports = postSignUpController;
