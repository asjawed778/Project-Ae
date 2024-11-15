const User = require('../../models/user/User');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
require('dotenv').config();


exports.updatePassword = async (req, res, next) => {
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

        if (oldPassword === newPassword) {
            const err = new Error("Old password and New password should be different");
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