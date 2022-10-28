const { default: mongoose } = require('mongoose')
const moongoose = require('mongoose')
const Schema = moongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,  
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)