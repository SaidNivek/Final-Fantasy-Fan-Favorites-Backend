const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
router.use(express.json())
router.use(cors())

// Authenticate a user
// Route /user/login
router.post('/login', asyncHandler(async (req, res) => {


    res.json({message: 'Login User'})
}))

// Get user data
// Route /user/me
router.get('/me', asyncHandler(async (req, res) => {
    res.json({message: 'My user data'})
}))


// Register a new user
// Route /user/register
router.post('/register', asyncHandler(async (req, res) => {
    const { username, password, email } = req.body
    if(!username || !password || !email) {
        res.status(400)
        throw new Error(`Please add all fields`)
    }

    // Check if the user exists
    const userExists = await User.findOne({username})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the password
    // Generate the salt, it accepts a number of rounds - 10 in this case
    const salt = await bcrypt.genSalt(10)
    // Hash the password - takes in 2 params, the password from the user and the salt
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username, email, password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}))




module.exports = router