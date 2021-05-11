const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    stress_level: {
        type: [Number],
        default: [],
    },
})

module.exports = mongoose.model("User", schema);