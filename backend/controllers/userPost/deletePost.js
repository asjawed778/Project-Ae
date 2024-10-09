const User = require('../../models/User');
const Post = require('../../models/Post.js');
const { deleteFileFromCloudinary, getCloudinaryPublicId } = require('../../utils/cloudinaryUtils');


exports.deletePost = async (req, res, next) => {
    try {
        // Extract post ID from request parameters
        const postId = req.params.postId;

        // Check if postId is provided
        if (!postId) {
            const err = new Error("Post ID is missing.");
            err.status = 400; 
            return next(err);
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401; 
            return next(err);
        }

        // Fetch the post from the database
        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404; 
            return next(err);
        }

        // If the post has images, delete them from Cloudinary
        if (post.images && post.images.length > 0) {
            for (const imageUrl of post.images) {
                const publicId = getCloudinaryPublicId(imageUrl); // Helper function to extract public ID
                await deleteFileFromCloudinary(publicId, 'image');
            }
        }

        // If the post has videos, delete them from Cloudinary
        if (post.videos && post.videos.length > 0) {
            for (const videoUrl of post.videos) {
                const publicId = getCloudinaryPublicId(videoUrl);
                await deleteFileFromCloudinary(publicId, 'video');
            }
        }

        // Proceed to delete the post from the database
        await Post.findByIdAndDelete(postId);

        // Find the associated user
        const user = await User.findById(post.userId);
        if (!user) {
            const err = new Error("User not found.");
            err.status = 404; // Not Found
            return next(err);
        }

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

