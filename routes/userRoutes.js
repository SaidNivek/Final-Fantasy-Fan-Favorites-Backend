const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { protect } = require('../middleware/authMiddleware')
router.use(express.json())
router.use(cors())

// This function will generate a JWT
// user id will be the payload
const generateToken =(id) => {
    // This will sign a new token with the id that's passed in, withthis secret used, and will expire in 1d
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
} 

const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body
    // Check for user email
    const user = await User.findOne({username})
    // If the username exists by checking for their email AND
    // the hashed PW (stored in the DB) matches the PW given, then we can login    
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            role: user.role,
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// Authenticate a user
// Route /user/login
router.post('/login', loginUser)

// Get user data
// Route /user/me
// Private Access
router.get('/me', protect, asyncHandler(async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        username: username,
        email: email,
    })
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
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}))




module.exports = router