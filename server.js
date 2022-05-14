// DEPENDENCIES
// get access to .env variables
require('dotenv').config();
// pull PORT from .env, set default value to 3000
const { PORT = 4000, MONGODB_URI } = process.env;

// IMPORTS
// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// create application object from express import
const app = express();
// Import Middleware
const cors = require('cors');
const morgan = require('morgan');

// MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// DATABASE CONNECTION
require('./config/db.connection')

// MODELS
const database = require('./models')

// ROUTES

// test router
app.get('/', (req, res) => {
    res.send('Hello World!')
})


// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));