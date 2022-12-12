const express = require("express");
const router = express.Router();

const getIndexController = require("../controllers/getIndexController");

router.get("/", getIndexController)

module.exports = router;