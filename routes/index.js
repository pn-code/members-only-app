const express = require("express");
const router = express.Router();
const User = require("../models/user");

const getIndexController = require("../controllers/getIndexController");

router.get("/", getIndexController)

module.exports = router;