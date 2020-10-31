const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'NA'
    },
    otp: {
        type: Number,
        required: false
    },
    otp_verified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema, 'user')