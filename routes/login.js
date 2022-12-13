const express = require("express");
const getLoginController = require("../controllers/getLoginController");
const postLoginController = require("../controllers/postLoginController");
const router = express.Router();

router.get("/", getLoginController)

router.post("/", postLoginController)

module.exports = router;