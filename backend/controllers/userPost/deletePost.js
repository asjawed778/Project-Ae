const User = require('../../models/User');
const Post = require('../../models/Post.js');
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
        // Extract post ID from request parameters
        const postId = req.params.postId;

        // Check if postId is provided
        if (!postId) {
            return next(new Error("Post ID is missing.")); 
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return next(new Error("Unauthorized action.")); 
        }

        // Fetch the post from the database
        const post = await Post.findById(postId);
        if (!post) {
            return next(new Error("Post not found.")); 
        }

        // Check if the associated user exists
        const user = await User.findById(post.userId);
        if (!user) {
            return next(new Error("User not found.")); 
        }

        // If the post has images, delete them from Cloudinary
        if (post.images?.length > 0) {
            await deleteFilesFromCloudinary(post.images, 'image');
        }

        // If the post has videos, delete them from Cloudinary
        if (post.videos?.length > 0) {
            await deleteFilesFromCloudinary(post.videos, 'video');
        }

        // Proceed to delete the post from the database
        await Post.findByIdAndDelete(postId);

        // Remove post ID from user's posts array
        user.posts.pull(postId);
        await user.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });

    } catch (error) {
        return next(error);
    }
};
