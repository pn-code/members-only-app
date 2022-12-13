require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Require user/message models
const User = require('./models/user');
const Message = require('./models/message');

// Sets up MongoDB
const mongoURL = process.env.MONGO_URL
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Sets up Express
const app = express();
const PORT = 3000;

// Sets up View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "./views"))

// Sets up express middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }));

// Sets up passport middleware
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Sets up routes
const indexRouter = require('./routes/index')
const signUpRouter = require('./routes/sign_up')

app.use("/", indexRouter)
app.use("/sign-up", signUpRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})