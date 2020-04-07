const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let dbConfig = require('./db/db');
var cookieParser = require('cookie-parser')



const articleRoute = require('./routes/article.route');
const commentRoute = require('./routes/comment.route');

const app = express();
const port = process.env.PORT || 4000;



app.use(cors());
app.use(express.json());
app.use('/articles', articleRoute);
app.use('/comments', commentRoute);


app.use(cookieParser());
app.get('/home', function(req, res) {
    
    if(req.cookies.count){
        var count = parseInt(req.cookies.count);
    } else {
        var count = 0;
    }
    count = count+1;
    res.cookie('count', count);
    res.send('count :'+ count);
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Connected!')
    },
    error => {
        console.log('Error during connection attempt: ' + error)
    }
)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

