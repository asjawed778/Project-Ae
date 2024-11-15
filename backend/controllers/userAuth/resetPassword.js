const User = require('../../models/user/User');
const otpGenerator = require('otp-generator');
const emailTemplate = require('../../templates/mailOTP');
const { mailSender } = require('../../utils/mailSender');
const OTP = require('../../models/OTP');
const bcrypt = require('bcrypt');
const validator = require("email-validator");
const passwordValidator = require('password-validator');
require('dotenv').config();


exports.sendForgotPasswordOTP = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            const err = new Error("Please enter email to reset password");
            err.status = 400;
            return next(err);
        }

        // email validation
        if (!validator.validate(email)) {
            const err = new Error("Invalid email address");
            err.status = 403;
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
        // password validator 
        const schema = new passwordValidator();
        schema
            .is().min(8)
            .is().max(100)
            .has().uppercase()
            .has().lowercase()
            .has().digits(1)
            .has().not().spaces()
            .is().not().oneOf(['Passw0rd', 'Password123']);


        if (!schema.validate(password)) {
            const err = new Error(
                "Password must be at least 8 characters long and max 100 char long, contain at least one uppercase letter, one lowercase letter, and one number."
            );
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