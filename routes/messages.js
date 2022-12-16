const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", (req, res) => {
    console.log(req.user)
    if (!req.user) {
        res.redirect("/login");
    } else {
        Message.find((err, messages) => {
            if (err) return res.send("There was an error.");
            res.render("message_list", { member: req.user.membership, messages: messages });
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

module.exports = router;
