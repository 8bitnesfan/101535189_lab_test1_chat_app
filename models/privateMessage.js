const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    date_sent: { type: Date, default: Date.now },
    from_user: String,
    to_user: String,
    message: String
});

module.exports = mongoose.model("Message", messageSchema);