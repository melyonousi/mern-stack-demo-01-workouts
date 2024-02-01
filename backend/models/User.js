const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: [
            validator.isEmail, 'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        validate: [
            validator.isStrongPassword, 'must be a valid password'
        ]
    },
    avatar: {
        type: String,
        required: false,
    }
}, { timestamps: true })

// static register method
// we can't use arrow function here
userSchema.statics.register = async function (_user) {
    const exists = await this.findOne({ email: _user?.email })
    if (exists) {
        throw Error(`User ${_user.email} email already exists`)
    }
    if (!_user.password) {
        throw Error(`Password field is required`)
    }
    if (_user.confirmPassword !== _user.password) {
        throw Error(`confirm Password field is required`)
    }
    if (!validator.isStrongPassword(_user.password)) {
        throw Error(`must be a valid password`)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(_user.password, salt)

    const user = await this.create({
        name: _user.name,
        email: _user.email,
        password: hash,
        avatar: _user.avatar,
    })

    return user
}

// static login method
// we can't use arrow function here
userSchema.statics.login = async function (_user) {
    const user = await this.findOne({ email: _user?.email })

    if (!user) {
        throw Error(`user not found with this email: ${_user.email}`)
    }

    const match = await bcrypt.compare(_user.password, user.password)

    if (!match) {
        throw Error(`password mismatch`)
    }

    return user
}

module.exports = mongoose.model('User', userSchema)