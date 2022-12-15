require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passport-config");

// Require user/message models
const User = require("./models/user");
const Message = require("./models/message");

// Sets up MongoDB
const mongoURL = process.env.MONGO_URL;
mongoose.set("strictQuery", true);
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Sets up Express
const app = express();
const PORT = 3000;

// Sets up View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Sets up express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize Passport Config
initializePassport(passport);

// Sets up passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Sets up routes
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/sign_up");
// const loginRouter = require("./routes/login")

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);

app.get("/login", (req, res) => res.render("login"));
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
    })
);
app.get("/log-out", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
