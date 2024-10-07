const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


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