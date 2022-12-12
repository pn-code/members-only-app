const User = require("../models/user")
const express = require("express");
const router = express.Router();

const getSignUpController = require("../controllers/getSignUpController");
const postSignUpController = require("../controllers/postSignUpController");

router.get("/", getSignUpController)

router.post("/", postSignUpController)


module.exports = router;
