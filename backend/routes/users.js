const express = require('express');

const { loginUser, registerUser, uploadAvatar, upload } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

// login
router.post('/login', loginUser)

// register
router.post('/register', registerUser)

// middleware => require auth for all below routes
router.use(requireAuth)

// upload file
router.post('/upload', upload.single('avatar'), uploadAvatar)

module.exports = router