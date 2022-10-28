const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productname: {
        type: String,
        required: true,
    },
    memory: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    saleoff: {
        type: Number,
        default: 0,
    },
    color: {
        type: [String],
        required: true,
    },
    productimage: {
        type: String,
        required: true,
    },
    description: {
        type:String
    },
    state: {
        type: String,
        required: true,
        enum: ['STOCKING', 'OUTOFSTOCKING'],
        default: "STOCKING",
    },
    category: {
        type: String,
        required: true,
        enum: ['TABLET', 'ĐIỆN THOẠI', 'ĐỒNG HỒ', 'PHỤ KIỆN'],
        default: "ĐIỆN THOẠI",
    },
    firm: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Product', ProductSchema)