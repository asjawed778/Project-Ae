const User = require('../../models/user/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
require('dotenv').config();

exports.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            const err = new Error("Please Enter all fields");
            err.status = 400;
            return next(err);
        }

        // Use regex to determine if identifier is an email
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let user;

        if (validator.validate(identifier)) {
            // If identifier is an email, find user by email
            user = await User.findOne({ email: identifier }).populate("role");
        } else {
            // Otherwise, find user by username
            user = await User.findOne({ username: identifier }).populate("role");
        }

        if (!user) {
            const err = new Error("User Not found");
            err.status = 404;
            return next(err);
        }

        // Check the password
        if (await bcrypt.compare(password, user.password)) {
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
            user.posts = undefined;

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
