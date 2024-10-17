const Post = require('../../models/Post');

// Add a comment to a post
exports.addComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view posts");
            err.status = 401;
            return next(err);
        }
        const { id } = req.user;

        const { postId } = req.params;
        const { comment } = req.body;

        if (!postId || !comment) {
            const err = new Error("Post ID and comment are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const newComment = {
            userId: id,
            comment,
            replies: [],
            upvotes: [],
            downvotes: []
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comments: post.comments
        });
    } catch (error) {
        next(error);
    }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId } = req.params;

        if (!postId || !commentId) {
            const err = new Error("Post ID or Comment ID is missing.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const commentIndex = post.comments.findIndex(
            comment => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const comment = post.comments[commentIndex];
        const isCommentOwner = comment.userId.toString() === req.user.id;
        const isPostOwner = post.userId.toString() === req.user.id;

        if (!isCommentOwner && !isPostOwner) {
            const err = new Error("Unauthorized action. Only the comment's author or the post's owner can delete this comment.");
            err.status = 403;
            return next(err);
        }

        if (!comment.parentCommentId) {
            post.comments.splice(commentIndex, 1);
        } else {
            const parentCommentIndex = post.comments.findIndex(
                parentComment => parentComment._id.toString() === comment.parentCommentId.toString()
            );

            if (parentCommentIndex !== -1) {
                post.comments[parentCommentIndex].replies = post.comments[parentCommentIndex].replies.filter(
                    reply => reply._id.toString() !== commentId
                );
            }
        }

        await post.save();
        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
            comments: post.comments
        });
    } catch (error) {
        next(error);
    }
};

// Edit a comment
exports.editComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId } = req.params;
        const { updatedComment } = req.body;

        if (!postId || !commentId || !updatedComment) {
            const err = new Error("Post ID, Comment ID, and updated comment text are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const commentIndex = post.comments.findIndex(
            comment => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const comment = post.comments[commentIndex];
        const isCommentOwner = comment.userId.toString() === req.user.id;
        const isPostOwner = post.userId.toString() === req.user.id;

        if (!isCommentOwner && !isPostOwner) {
            const err = new Error("Unauthorized action. Only the comment's author or the post's owner can edit this comment.");
            err.status = 403;
            return next(err);
        }

        const updatedCommentText = updatedComment.trim();
        if (!updatedCommentText) {
            const err = new Error("Updated comment text cannot be empty.");
            err.status = 400;
            return next(err);
        }

        comment.comment = updatedCommentText;
        comment.updatedAt = new Date();

        await post.save();

        res.status(200).json({
            success: true,
            message: 'Comment edited successfully',
            comment: comment
        });
    } catch (error) {
        next(error);
    }
};
