const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./db/db').mongoURI;
var cookieParser = require('cookie-parser')

const posts = require('./routes/api/posts');
const comments = require('./routes/api/comments');

const app = express();

// cookies
app.use(cookieParser());
app.get('/', function(req, res) {
    
    if(req.cookies.count){
        var count = parseInt(req.cookies.count);
    } else {
        count = 0;
    }
    count = count+1;
    res.cookie('count', count);
    res.send('visits :'+ ' ' + count);
});

// Bodyparser middleware
app.use(bodyParser.json());

//mongo connection 
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('Connected do database'))
.catch(error => console.log('Connection to database failed: ' + error));

//Use Routes
app.use('/posts', posts);
app.use('/comments', comments);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
