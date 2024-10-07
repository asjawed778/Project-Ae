
require('dotenv').config();


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