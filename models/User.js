const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

    username: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
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
},
{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;