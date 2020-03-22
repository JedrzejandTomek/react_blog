const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let dbConfig = require('./db/db');

const articleRoute = require('./routes/article.route');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/articles', articleRoute);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
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

