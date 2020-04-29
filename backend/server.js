const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/default').mongoURI;
const cookieParser = require('cookie-parser');

const posts = require('./routes/api/posts');
const comments = require('./routes/api/comments');
const users = require('./routes/api/user');
const auth = require('./routes/api/auth');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

//mongo connection 
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})
.then(() => console.log('Connected do database'))
.catch(error => console.log('Connection to database failed: ' + error));

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

//Use Routes
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/users', users);
app.use('/auth' , auth);
app.use('/uploads', express.static('uploads'));
app.use('/posts-list/uploads', express.static('uploads'));
app.use('/discussion/uploads', express.static('uploads'));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
