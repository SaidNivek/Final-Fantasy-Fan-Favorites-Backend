const express = require('express')
const router = express.Router()

// Authenticate a user
// Route /user/login
router.post('/login', (req, res) => {
    res.json({message: 'Login User'})
})

// Get user data
// Route /user/me
router.get('/me', (req, res) => {
    res.json({message: 'My user data'})
})


// Register a new user
// Route /user
router.post('/', (req, res) => {
    res.json({message: 'Register User'})
})




module.exports = router