const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from the Bearer header
            // Split the Bearer token into ['Bearer', 'token'], but only take the 1th index, which is the token
            token = req.headers.authorization.split(' ')[1]

            // verify token, passing in the token we just split and the secret from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token, since the user _id is in the payload
            // The id from the token is generated when we signed it within user routers
            // id can be called whatever when we sign it
            // the ('-password') will remove the password from the decoded string
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }