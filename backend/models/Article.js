const mongoose = require('mongoose');
const schema = mongoose.Schema;

let articleSchema = new schema({
        email: {
            type: String
        },
        title: {
            type: String
        },
        content: {
            type: String
        }
    }, {
        collection: 'articles'
    }
)

module.exports = mongoose.model('Article', articleSchema)