const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

class authController {
    // @route POST api/auth/register
    // @desc Resgister user
    // @access Public
    async register(req, res) {
        const {username, password} = req.body

        // Simple validation
        if(!username || !password) {
            return res.status(200).json({success: false, message: 'Missing username or password'})
        }
        try {
            // check for existing user
            const user = await User.findOne({username: username})

            if(user) {
                return res.status(200).json({success: false, message: 'Username already taken'})
            }
            
            // all good
            const hashedPassword = await argon2.hash(password)
            const newUser = new User ({
                username: username,
                password: hashedPassword,
            })
            await newUser.save()

            // return token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

            return res.status(200).json({success: true, message: "User created successfully!", accessToken})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    // @route POST api/auth/login
    // @desc Login user
    // @access Public
    async login(req, res) {
        const {username, password} = req.body

        // simple validation 
        if(!username || !password) {
            return res.status(200).json({"success": false, "message": 'Missing username or password'})
        }
        try {
            // check for existing 
            const user = await User.findOne({"username": username})

            if(!user) {
                return res.status(200).json({"success": false, "message": "Incorrect username or password"})
            }

            // check password
            const passwordValid = await argon2.verify(user.password, password)

            if(!passwordValid) {
                return res.status(200).json({"success": false, "message": "Incorrect username or password"})
            }

            // all good
            // return token
            const accessToken = jwt.sign({"userId": user._id}, process.env.ACCESS_TOKEN_SECRET)

            return res.status(200).json({"success": true, "message": "User logged in successfully!", accessToken})
        } catch (error) {
            console.log(error)
            return res.status(500).json({"success": false, "message": 'Internal server error'})
        }
    }
    
}

module.exports = new authController()