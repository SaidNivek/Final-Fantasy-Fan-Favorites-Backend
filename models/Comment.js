const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    comment: {
        type: String,
        required: [true, "Please enter a comment."]
    },
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        // type - configures 'product' field to only store MDB - Object Ids
        // when creating a new review - we absolutely need an object 
        ref: 'User',
        // reference is how mongoose will know where to look up documents
        // that match the current product's ObjectId
        // ref should store a string that matches the name of your related model
    },
    game: {
        required: true,
        type: mongoose.Types.ObjectId,
        // type - configures 'product' field to only store MDB - Object Ids
        // when creating a new review - we absolutely need an object 
        ref: 'Game',
        // reference is how mongoose will know where to look up documents
        // that match the current product's ObjectId
        // ref should store a string that matches the name of your related model
}},
    {
        timestamps: true
    },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;