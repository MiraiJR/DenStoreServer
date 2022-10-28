const jwt = require('jsonwebtoken')
const passport = require('passport')
const configFB = require('../Config/configLgFb')
const FacebookStrategy = require('passport-facebook').Strategy

const verifyToken = (req, res, next) => {
    const authheader = req.header('Authorization')
    const token = authheader && authheader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ success: false, message: "Access token not found" })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: "Invalid token" })
    }
}

module.exports = { verifyToken }