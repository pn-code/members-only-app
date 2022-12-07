const mongoose = require("mongoose");

const Schema = new mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    membership: { type: Boolean }
})

module.exports = mongoose.model("User", UserSchema);