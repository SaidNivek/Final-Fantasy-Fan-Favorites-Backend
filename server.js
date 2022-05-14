// DEPENDENCIES
// get access to .env variables
require('dotenv').config();
// pull PORT from .env, set default value to 3000
const { PORT = 3000, MONGODB_URL } = process.env;

// IMPORTS
// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// create application object from express import
const app = express();

// MIDDLEWARE
const cors = require('cors');
const morgan = require('morgan');

// DATABASE CONNECTION
require('./config/db.connection')




// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));