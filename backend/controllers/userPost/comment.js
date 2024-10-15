const Post = require('../../models/Post');

exports.addComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized action." });
        }

        const { postId } = req.params;
        const { comment } = req.body;

        if (!postId || !comment) {
            return res.status(400).json({ message: "Post ID and comment are required." });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const newComment = {
            userId: req.user.id,
            comment,
            parentCommentId: null,
        };

        post.comments.push(newComment);
        await post.save();

        return res.status(201).json({ success: true, comments: post.comments });
    } catch (error) {
        return next(error);
    }
};

exports.deleteComment = async (req, res, next) => {
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

        // Find the index of the comment to delete
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

        // Ensure that the user deleting the comment is either:
        // 1. The comment's author
        // 2. The post's owner
        const isCommentOwner = comment.userId.toString() === req.user.id;
        const isPostOwner = post.userId.toString() === req.user.id;

        if (!isCommentOwner && !isPostOwner) {
            const err = new Error("Unauthorized action. Only the comment's author or the post's owner can delete this comment.");
            err.status = 403;
            return next(err);
        }

        // Check if the comment is a parent comment
        if (!comment.parentCommentId) {
            // If it's a parent comment, remove it and all its replies
            post.comments.splice(commentIndex, 1);
        } else {
            // If it's a reply, find the parent comment and remove this reply
            const parentCommentIndex = post.comments.findIndex(
                parentComment => parentComment._id.toString() === comment.parentCommentId.toString()
            );

            if (parentCommentIndex !== -1) {
                // Remove the reply from the parent comment's replies array
                post.comments[parentCommentIndex].replies = post.comments[parentCommentIndex].replies.filter(
                    reply => reply._id.toString() !== commentId.toString()
                );
            }
        }

        // Save the updated post
        await post.save();

        // Return a success response with the updated comments
        return res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
            comments: post.comments  // Return the updated comments array
        });

    } catch (error) {
        return next(error);  // Forward any errors to the error handler middleware
    }
};

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
        const updatedCommentText = updatedComment ? updatedComment.trim() : null;

        if (!updatedCommentText) {
            const err = new Error("Updated comment text cannot be empty.");
            err.status = 400;
            return next(err);
        }

        // Update the comment
        post.comments[commentIndex].comment = updatedCommentText;
        post.comments[commentIndex].updatedAt = new Date(); // Add an updatedAt field

        // Save the updated post
        await post.save();

        // Return a success response with the edited comment
        return res.status(200).json({
            success: true,
            message: 'Comment edited successfully',
            comment: post.comments[commentIndex] // Return only the edited comment
        });

    } catch (error) {
        return next(error);
    }
};




