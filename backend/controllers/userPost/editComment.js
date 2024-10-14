const Post = require('../../models/Post');

exports.editComment = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId } = req.params;

        // Check if postId and commentId are provided
        if (!postId || !commentId) {
            const err = new Error("Post ID or Comment ID is missing.");
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

        // Find the comment to edit
        const commentIndex = post.comments.findIndex(
            comment => comment._id.toString() === commentId.toString()
        );

        // Check if the comment exists
        if (commentIndex === -1) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const comment = post.comments[commentIndex];

        // Ensure that the user editing the comment is either:
        // 1. The comment's author
        // 2. The post's owner
        const isCommentOwner = comment.userId.toString() === req.user.id;
        const isPostOwner = post.userId.toString() === req.user.id;

        if (!isCommentOwner && !isPostOwner) {
            const err = new Error("Unauthorized action. Only the comment's author or the post's owner can edit this comment.");
            err.status = 403;
            return next(err);
        }

        // Get the updated comment text from the request body
        const { updatedComment } = req.body;
        if (!updatedComment) {
            const err = new Error("Updated comment text is missing.");
            err.status = 400;
            return next(err);
        }

        // Update the comment
        post.comments[commentIndex].comment = updatedComment;

        // Save the updated post
        await post.save();

        // Return a success response with the updated comments
        return res.status(200).json({
            success: true,
            message: 'Comment edited successfully',
            comments: post.comments  
        });

    } catch (error) {
        return next(error);  
    }
};
