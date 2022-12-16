const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", (req, res) => {
    if (!req.user) {
        res.redirect("/login");
    } else {
        Message.find((err, messages) => {
            if (err) return res.send("There was an error.");
            res.render("message_list", {
                member: req.user.membership,
                messages: messages,
                admin: req.user.admin
            });
        });
    }
});

router.post("/", (req, res, next) => {
    if (!req.user) {
        res.redirect("/login");
    } else {
        const message = new Message({
            title: req.body.new_message_title,
            text: req.body.new_message_body,
            timestamp: new Date(),
            author: req.user,
            author_name: req.user.username,
        }).save((err) => {
            if (err) return next(err);
        });
        res.redirect("/messages");
    }
});

router.get("/:_id", (req, res) => {
    res.render("delete_message", { _id: req.params._id });
});

router.post("/:_id", (req, res, next) => {
    if (req.user.admin) {
        Message.findOneAndRemove({ _id: req.params._id }, (err, message) => {
            if (err) return next(err);
            res.redirect("/messages");
        });
    } else {
        return res.send("You do not have the authorization to complete this action.")
    }
});

module.exports = router;
