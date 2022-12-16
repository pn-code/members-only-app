const express = require("express");
const router = express.Router();

const getIndexController = require("../controllers/getIndexController");
const postIndexController = require("../controllers/postIndexController");

router.get("/", getIndexController);
router.post("/", postIndexController);

module.exports = router;
