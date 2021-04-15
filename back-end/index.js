const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // deprecated
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

require('./config/passport')(passport);

// app.use(bodyParser.json());
app.use(express.json());

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
    res.send("Home page");
});

app.use('/account', account);