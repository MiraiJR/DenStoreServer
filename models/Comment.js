const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    idproduct: {
        type: Schema.Types.ObjectId,
        ref: 'products',
    },
})

module.exports = mongoose.model("comments", CommentSchema)