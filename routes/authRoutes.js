// routes/authRoutes.js
const express = require('express')
const Auth = require('../controllers/authController.js')

const router = express.Router()

router.post('/login', Auth.login)
router.post('/register', Auth.register)
router.get('/logout', Auth.logout)
router.get('/user', ...Auth.user)

module.exports = router