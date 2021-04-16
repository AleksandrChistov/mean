const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // deprecated
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
const Post = require('./models/post');

const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

require('./config/passport')(passport);

// app.use(bodyParser.json());
app.use(express.json({limit: '10mb'}));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Successful connection to database');
});

mongoose.connection.on('error', (err) => {
    console.log('Not successful connection to database with ' + err);
});

app.listen(port, () => {
    console.log('THe server has been run on the port ' + port);
});

app.get('/', (req, res) => {
    Post.find().then(posts => res.json(posts));
});

app.get('/post/:id', (req, res) => {
    const url = req.url.split('/');
    const id = url[2];
    Post.findById(id).then(post => res.json(post));
});

app.delete('/post/:id', (req, res) => {
    const url = req.url.split('/');
    const id = url[2];
    Post.deleteOne({ _id: id }).then(() => res.json({ success: true }));
});

app.use('/account', account);