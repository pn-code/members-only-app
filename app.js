const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()

// Sets up MongoDB
const mongoURL = process.env.MONGO_URL
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Sets up Express
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})