const User = require('../../models/User');
const otpGenerator = require('otp-generator');
const emailTemplate = require('../../templates/mailOTP');
const { mailSender } = require('../../utils/mailSender');
const OTP = require('../../models/OTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.sendSignupOTP = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            const err = new Error("Please fill all the details to register");
            err.status = 400;
            return next(err);
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const err = new Error("User Already Exists, Please login");
            err.status = 409;
            return next(err);
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const emailBody = emailTemplate(otp);
        await mailSender(email, otp, emailBody);
        await OTP.deleteMany({ email });
        await OTP.create({ email, otp });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        return next(error);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, otp } = req.body;

        if (!name || !email || !password || !confirmPassword || !otp) {
            const err = new Error("Please Enter OTP and all the details to register");
            err.status = 400;
            return next(err);
        }

        const userOTP = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);

        // Check if OTP is valid and not expired
        if (!userOTP || userOTP.otp !== otp || userOTP.expiresAt < Date.now()) {
            const err = new Error("Incorrect or expired OTP");
            err.status = 401;
            return next(err);
        }

        await OTP.deleteMany({ email: email });
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return next(error);
        }

        let newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        let user = await User.findOne({ email });
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });
        user = user.toObject();
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'None',
            secure: true
        };
        res.cookie("token", token, options).status(200).json({
            success: true,
            token: token,
            user: user,
            message: "User Created successfully"
        });

    } catch (error) {
        return next(error);
    }
};