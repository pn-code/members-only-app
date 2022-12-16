const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 200 },
    timestamp: { type: Date, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    author_name: { type: String, required: true },
});

MessageSchema.virtual("formatted_date").get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATE_MED
    );
});

module.exports = mongoose.model("Message", MessageSchema);
