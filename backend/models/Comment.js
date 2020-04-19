const mongoose = require('mongoose');
const schema = mongoose.Schema;

let commentSchema = new schema({
     
        postId:{
            type: schema.Types.ObjectId,
            ref: 'Article'
        },
        comment: {
            type: String
        },
       
    }, {
        collection: 'comments'
    }
)

module.exports = mongoose.model('Comments', commentSchema)
