const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productname: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: "productname",
    },
    memory: {
        type: [String],
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
        type: [String],
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
    slugcategory: {
        type: String,
        slug: "category",
    },
    firm: {
        type: Schema.Types.ObjectId,
        ref: 'firms',
    },
})

module.exports = mongoose.model('products', ProductSchema)