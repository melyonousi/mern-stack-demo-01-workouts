const jwt = require('jsonwebtoken')
const User = require('../models/User')

// build token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

// login
const loginUser = async (req, res) => {

    try {
        const _user = req.body

        const user = await User.login(_user)

        const token = createToken(user._id)

        res.status(200).json({ token, user: { name: user.name, email: user.email, avatar: user.avatar } })
        
    } catch (error) {
        res.status(400).json({ message: error.message, errors: error.errors })
    }
}


// register
const registerUser = async (req, res) => {

    const user = req.body

    try {
        const _user = await User.register(user)

        // create a token
        const token = createToken(_user._id)

        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ message: error.message, errors: error.errors })
    }

}

module.exports = {
    loginUser,
    registerUser
}