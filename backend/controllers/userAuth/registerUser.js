
const otpGenerator = require('otp-generator');
const emailTemplate = require('../../templates/mailOTP');
const { mailSender } = require('../../utils/mailSender');
const OTP = require('../../models/OTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/User');
const { generateFromEmail } = require('unique-username-generator'); // Import the generator
const validator = require("email-validator");
const passwordValidator = require('password-validator');
const AdditionalDetails = require('../../models/user/AdditionalDetails');
require('dotenv').config();

exports.sendSignupOTP = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            const err = new Error("Please fill all the details to register");
            err.status = 400;
            return next(err);
        }

        // email validation
        if (!validator.validate(email)) {
            const err = new Error("Invalid email address");
            err.status = 403;
            return next(err);
        }

        if (password !== confirmPassword) {
            const err = new Error("Password and confirm password do not match");
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

exports.signupUser = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, otp } = req.body;

        if (!name || !email || !password || !confirmPassword || !otp) {
            const err = new Error("Please Enter OTP and all the details to register");
            err.status = 400;
            return next(err);
        }

        // email validation
        if (!validator.validate(email)) {
            const err = new Error("Invalid email address");
            err.status = 403;
            return next(err);
        }

        if (password !== confirmPassword) {
            const err = new Error("Password and confirm password do not match");
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

        // Check if OTP is valid and not expired
        if (!userOTP || userOTP.otp !== otp || userOTP.expiresAt < Date.now()) {
            const err = new Error("Incorrect or expired OTP");
            err.status = 401;
            return next(err);
        }

        await OTP.deleteMany({ email: email });

        let username = generateFromEmail(email, 3);
        let existingUser = await User.findOne({ username });

        // Check for username uniqueness and regenerate if necessary
        let counter = 1;
        while (existingUser) {
            // Regenerate username by appending additional random digits
            username = generateFromEmail(email, 3 + counter);
            existingUser = await User.findOne({ username });
            counter++;
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return next(error);
        }

        const avatarUrl = `${process.env.PROFILE_URL}${name}`;
        let newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
            profilePic: avatarUrl,
            additionalDetails: null
        });

        await newUser.save();
        const additionalDetails = await AdditionalDetails.create({
            user: newUser._id
        })

        let user = await User.findOne({ email }).populate('role');
        user.additionalDetails = additionalDetails._id;
        await user.save();

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
            role: user.role
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
            message: "User Created successfully",
            token: token,
            user: user,
        });

    } catch (error) {
        return next(error);
    }
};
