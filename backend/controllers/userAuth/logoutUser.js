require('dotenv').config();

exports.logout = async (req, res, next) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return next(error);
    }
};
