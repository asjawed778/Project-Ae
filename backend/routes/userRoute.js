const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    logout,
    changePassword,
    sendSignupOTP,
    sendForgotPasswordOTP,
    verifyForgotPasswordOTP
} = require('../controllers/auth');

const { auth } = require('../middlewares/auth');


router.post('/send-signup-otp', sendSignupOTP);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/change-password', auth, changePassword);
router.post('/send-forgotPassword-otp', sendForgotPasswordOTP);
router.post('/verify-forgotPassword-otp', verifyForgotPasswordOTP);


module.exports = router;