const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        default: "user"
    },
    joined: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;