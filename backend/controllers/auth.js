const User = require('../models/User');
const otpGenerator = require('otp-generator');
const emailTemplate = require('../templates/mailOTP');
const { mailSender } = require('../utils/mailSender');
const OTP = require('../models/OTP');
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

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const err = new Error("Please Enter all fields");
            err.status = 400;
            return next(err);
        }

        let user = await User.findOne({ email });
        if (!user) {
            const err = new Error("User Not found");
            err.status = 404;
            return next(err);
        }
        if (await bcrypt.compare(password, user.password)) {
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
                message: "User Logged In successfully"
            });
        } else {
            const err = new Error("Incorrect Password");
            err.status = 401;
            return next(err);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: "User Logged Out successfully"
        });
    } catch (error) {
        return next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            const err = new Error("Please Enter all details");
            err.status = 400;
            return next(err);
        }

        if (newPassword !== confirmNewPassword) {
            const err = new Error("New password and confirm new password doesn't match");
            err.status = 400;
            return next(err);
        }

        const user = await User.findById(id);

        if (!user) {
            const err = new Error("User Not found");
            err.status = 404;
            return next(err);
        }
        if (await bcrypt.compare(oldPassword, user.password)) {
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(newPassword, 10);
            } catch (error) {
                return next(error);
            }
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Password changed successfully"
            });
        } else {
            const err = new Error("Incorrect old password");
            err.status = 401;
            return next(err);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.sendForgotPasswordOTP = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            const err = new Error("Please enter email to reset password");
            err.status = 400;
            return next(err);
        }

        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            return next(err);
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Create email body using the OTP template
        const emailBody = emailTemplate(otp);

        // Send OTP via email
        await mailSender(email, "Your OTP for Password Reset", emailBody);

        // Delete any previous OTP records for the email
        await OTP.deleteMany({ email });

        await OTP.create({ email, otp });

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please check your email.",
        });

    } catch (error) {
        return next(error);
    }
};

exports.verifyForgotPasswordOTP = async (req, res, next) => {
    try {
        const { email, otp, newPassword, confirmNewPassword } = req.body;

        if (!email || !otp || !newPassword || !confirmNewPassword) {
            const err = new Error("Please enter email, OTP, and new password details");
            err.status = 400;
            return next(err);
        }

        if (newPassword !== confirmNewPassword) {
            const err = new Error("New password and confirm password do not match");
            err.status = 400;
            return next(err);
        }

        const userOTP = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);

        // Check if the OTP is valid and not expired
        if (!userOTP || userOTP.otp !== otp || userOTP.expiresAt < Date.now()) {
            const err = new Error("Incorrect or expired OTP");
            err.status = 401;
            return next(err);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({ email: email }, { password: hashedPassword });

        await OTP.deleteMany({ email: email });

        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully. You can now log in.",
        });

    } catch (error) {
        return next(error);
    }
};
