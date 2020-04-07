const mongoose = require('mongoose');
const schema = mongoose.Schema;

let commentSchema = new schema({
     
        content: {
            type: String
        },
       
    }, {
        collection: 'comments'
    }
)

module.exports = mongoose.model('Comment', commentSchema)