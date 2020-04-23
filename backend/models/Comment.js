const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema (
    {
        comment: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        postID: {
            type: String,
            required: true
        }
    },
    {
        collection: "comments"
    }
);

module.exports = Comment = mongoose.model('comment', CommentSchema);