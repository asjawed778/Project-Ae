const express = require('express');
const router = express.Router();
const { signup, sendOTP, login, logout, changePassword } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

router.post('/sendOtp', sendOTP);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/change-password', auth, changePassword);

module.exports = router;