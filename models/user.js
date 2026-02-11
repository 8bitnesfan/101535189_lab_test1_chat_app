const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    createdon: {type: Date, default: Date.now()},
    firstname: String,
    lastname: String,
    password: String
});

module.exports = mongoose.model("user", userSchema);