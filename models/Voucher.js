const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoucherSchema = new Schema({
    code: {
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    // endedAt: {
    //     type: Date,
    // },
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    }
})

module.exports = mongoose.model("vouchers", VoucherSchema)