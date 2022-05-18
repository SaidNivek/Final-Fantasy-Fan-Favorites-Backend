const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    comment: {
        type: String,
        required: [true, "Please enter a comment."]
    },
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    game: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Game',
}},
    {
        timestamps: true
    },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;