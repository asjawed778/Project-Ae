
const User = require('../models/User');
const otpGenerator = require('otp-generator');
const emailTemplate = require('../templates/mailOTP');
const { mailSender } = require('../utils/mailSender');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('bcrypt/promises');
require('dotenv').config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details"
            })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Already registered"
            })
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
            otp,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, otp } = req.body;
        if (!name || !email || !password || confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details to register"
            })
        }

        const userOTP = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);

        if (userOTP.otp !== otp) {
            return res.status(401).json({
                success: false,
                message: "Incorrect OTP"
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in encrypting password",
                error: err
            })
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
        }
        let token = jwt.sign(payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            });
        user = user.toObject();
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'None',
            secure: true
        }
        res.cookie("token", token, options).status(200).json(
            {
                success: true,
                token: token,
                user: user,
                message: "User Created successfully"
            }
        );

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            Error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }

        let user = await User.findOne({ email });
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user._id,
                email: user.email,
                name: user.name
            }
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h"
                });
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }
            res.cookie("token", token, options).status(200).json(
                {
                    success: true,
                    token: token,
                    user: user,
                    message: "User LoggedIn successfully"
                }
            );
        } else {
            return res.status(403).json(
                {
                    success: false,
                    message: "Password Incorrect"
                }
            );
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: "User Logged Out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.changePassword = async (req, res) => {
    try {

        const id = req.user.id;
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Please Enter all details"
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm new password doesn't match"
            })
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (await bcrypt.compare(oldPassword, user.password)) {

            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(newPassword, 10);

            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error in encrypting password",
                    Error: error.message
                })
            }
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Password changed successfully"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect Old password"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error changin password",
            Error: error.message
        });
    }
}

