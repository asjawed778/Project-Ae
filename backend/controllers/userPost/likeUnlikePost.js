const Post = require('../../models/Post');

exports.likeUnlikePost = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user;  
        const { postId } = req.params;

        // Check if postId is provided
        if (!postId) {
            const err = new Error("Post ID is missing.");
            err.status = 400; 
            return next(err);
        }

        // Find the post by postId
        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        // Check if the post is already liked by the user
        const isLiked = post.likes.includes(id);

        if (isLiked) {
            // If the post is already liked, unlike it (remove user's ID from the likes array)
            post.likes = post.likes.filter(userId => String(userId) !== String(id));
        } else {
            // If the post is not liked, add the user's ID to the likes array
            post.likes.push(id);
        }

        // Save the post with updated likes
        await post.save();

        // Return success response with updated like status
        return res.status(200).json({
            success: true,
            message: isLiked ? 'Post unliked successfully' : 'Post liked successfully',
            likesCount: post.likes.length,
            post: {
                _id: post._id,
                likes: post.likes,
            }
        });
    } catch (error) {
        return next(error); 
    }
};
