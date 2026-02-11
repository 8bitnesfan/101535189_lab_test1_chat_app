const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    date_sent: { type: Date, default: Date.now },
    from_user: String,
    room: String,
    message: String
});

module.exports = mongoose.model("GroupMessage", groupMessageSchema);