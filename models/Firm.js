const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FirmSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("firms", FirmSchema);