const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: Date.now
    },
    updatedate: {
        type: Date,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);