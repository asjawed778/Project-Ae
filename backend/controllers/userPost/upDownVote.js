const Post = require('../../models/Post');

exports.vote = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user;  
        const { postId } = req.params;
        const { action } = req.body; // Expecting either "upvote" or "downvote"

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

        // Check if the user has already upvoted or downvoted
        const isUpvoted = post.upvotes.includes(id);
        const isDownvoted = post.downvotes.includes(id);

        if (action === "upvote") {
            if (isUpvoted) {
                // If the post is already upvoted, remove the upvote
                post.upvotes = post.upvotes.filter(userId => String(userId) !== String(id));
            } else {
                // If the post is downvoted, remove the downvote and add the upvote
                if (isDownvoted) {
                    post.downvotes = post.downvotes.filter(userId => String(userId) !== String(id));
                }
                post.upvotes.push(id);
            }
        } else if (action === "downvote") {
            if (isDownvoted) {
                // If the post is already downvoted, remove the downvote
                post.downvotes = post.downvotes.filter(userId => String(userId) !== String(id));
            } else {
                // If the post is upvoted, remove the upvote and add the downvote
                if (isUpvoted) {
                    post.upvotes = post.upvotes.filter(userId => String(userId) !== String(id));
                }
                post.downvotes.push(id);
            }
        } else {
            const err = new Error("Invalid action. Must be 'upvote' or 'downvote'.");
            err.status = 400; 
            return next(err);
        }

        // Save the post with updated votes
        await post.save();

        // Return success response with updated vote counts
        return res.status(200).json({
            success: true,
            message: action === "upvote" ? 
                (isUpvoted ? 'Post upvote removed successfully' : 'Post upvoted successfully') : 
                (isDownvoted ? 'Post downvote removed successfully' : 'Post downvoted successfully'),
            upvotesCount: post.upvotes.length,
            downvotesCount: post.downvotes.length,
            post: {
                _id: post._id,
                upvotes: post.upvotes,
                downvotes: post.downvotes,
            }
        });
    } catch (error) {
        return next(error); 
    }
};
