const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()

// Sets up MongoDB
const mongoURL = process.env.MONGO_URL

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoURL);
}

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