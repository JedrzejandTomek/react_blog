const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  commentSchema = mongoose.schema({
     
        postId:{
            type: Schema.Types.ObjectId,
            ref: 'Article'
        },
        comment: {
            type: String
        },
       
    }, {
        collection: 'comments'
    }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {Comment}