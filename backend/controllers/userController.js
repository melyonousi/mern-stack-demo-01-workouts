const jwt = require('jsonwebtoken')
const User = require('../models/User')
const path = require('path')
const multer = require('multer')

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

        res.status(200).json({ token, user: { _id: user.id, name: user.name, email: user.email, avatar: user.avatar } })

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

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replaceAll(' ', '-').toLowerCase())
    },
});

const upload = multer({ storage: storage });

const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const user = await User.findOneAndUpdate(
            { _id: req.body._id },
            { avatar: file.filename },
            { new: true } // Add { new: true } to return the updated document
        )

        // Process the uploaded file as needed
        res.status(200).json({ avatar: user.avatar, success: 'image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
}

module.exports = {
    loginUser,
    registerUser,
    uploadAvatar,
    upload
}