const User = require('../../models/User');
const Post = require('../../models/Post.js');
const Comment = require('../../models/Comment.js');
const { deleteFileFromCloudinary, getCloudinaryPublicId } = require('../../utils/cloudinaryUtils');

// Helper function to delete files from Cloudinary
const deleteFilesFromCloudinary = async (files, type) => {
    return Promise.all(files.map(async (fileUrl) => {
        const publicId = getCloudinaryPublicId(fileUrl);
        return await deleteFileFromCloudinary(publicId, type);
    }));
};

exports.deletePost = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to delete the post.");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user;
        const postId = req.params.postId;

        // Check if postId is provided
        if (!postId) {
            const err = new Error("Post ID is missing.");
            err.status = 400;
            return next(err);
        }

        // Fetch the post from the database
        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        // Ensure the post belongs to the authenticated user
        if (post.userId.toString() !== id.toString()) {
            const err = new Error("You are not authorized to delete this post.");
            err.status = 401;
            return next(err);
        }

        // Check if the associated user exists
        const user = await User.findById(id);
        if (!user) {
            const err = new Error("User not found.");
            err.status = 404;
            return next(err);
        }

        // If the post has images, delete them from Cloudinary
        if (post.images?.length > 0) {
            try {
                await deleteFilesFromCloudinary(post.images, 'image');
            } catch (err) {
                const error = new Error("Error deleting images from Cloudinary.");
                error.status = 500;
                return next(error);
            }
        }

        // If the post has videos, delete them from Cloudinary
        if (post.videos?.length > 0) {
            try {
                await deleteFilesFromCloudinary(post.videos, 'video');
            } catch (err) {
                const error = new Error("Error deleting videos from Cloudinary.");
                error.status = 500;
                return next(error);
            }
        }

        // Delete all comments associated with the post
        await Comment.deleteMany({ postId });

        // Remove post ID from user's posts array
        user.posts.pull(postId);
        await user.save();

        // Proceed to delete the post from the database
        await Post.findByIdAndDelete(postId);

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });

    } catch (error) {
        return next(error);
    }
};
