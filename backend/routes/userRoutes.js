const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { sendSignupOTP, signupUser } = require('../controllers/userAuth/registerUser');
const { login } = require('../controllers/userAuth/loginUser');
const { logout } = require('../controllers/userAuth/logoutUser');
const { updatePassword } = require('../controllers/userAuth/updatePassword');
const { sendForgotPasswordOTP, verifyForgotPasswordOTP } = require('../controllers/userAuth/resetPassword');
const { updateUsername } = require('../controllers/userAuth/updateUsername');


router.post('/send-signup-otp', sendSignupOTP);
router.post('/verify-signup-otp', signupUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/update-password', auth, updatePassword);
router.post('/send-forgotPassword-otp', sendForgotPasswordOTP);
router.post('/verify-forgotPassword-otp', verifyForgotPasswordOTP);

router.post('/update-username', auth, updateUsername);


module.exports = router;