const User = require('../../models/User');

exports.updateUsername = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to update your username");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user; 
        const { username } = req.body;

        // Check if username is provided
        if (!username) {
            const err = new Error("Please provide a new username");
            err.status = 400;
            return next(err);
        }

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const err = new Error("Username already taken, please choose another one");
            err.status = 409; 
            return next(err);
        }

        // Update the user's username
        const updatedUser = await User.findByIdAndUpdate(id, { username }, { new: true });

        if (!updatedUser) {
            const err = new Error("User not found");
            err.status = 404;
            return next(err);
        }

        // Send success response with updated user data
        return res.status(200).json({
            success: true,
            message: "Username updated successfully",
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
            }
        });

    } catch (error) {
        // Log and handle any server errors
        console.error(error);
        return next(error);
    }
};
