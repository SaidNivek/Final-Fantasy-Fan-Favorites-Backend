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

// ROUTES
app.use('/user', require('./routes/userRoutes'))

// DATABASE CONNECTION
require('./config/db.connection')

// MODELS
const database = require('./models');
const { Game, User } = require('./models');

// ROUTES

// test router
app.get('/', (req, res) => {
    res.send('Final Fantasy Fan Favorites API')
})

// CREATE game route
app.post('/game', async (req, res) => {
    try {
        res.json(await Game.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// READ / get game route
app.get('/game', async (req, res) => {
    try {
        res.json(await Game.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE game route
app.put('/game/:id', async (req, res) => {
    try {
        res.json(await Game.findByIdAndUpdate(req.params.id, req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// DELETE game route
app.delete('/game/:id', async (req, res) => {
    try {
        res.json(await Game.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));