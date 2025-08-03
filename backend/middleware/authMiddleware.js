const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next)=>{

    const token = req.cookies.jwt

    if (token){
        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decoded.userIdentity).select('-password')
                next()

        } catch (error) {
            res.status(401)
        throw new Error("Unauthorized, token failed")
        }
    } else {
        res.status(401)
        throw new Error("Unauthorized, No token found")
    }

})

module.exports = {protect}