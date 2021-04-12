const express = require('express');
const cors = require('cors');
const bodyPArser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');

const app = express();

const port = 3000;

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