const Post = require('../../models/Post');

// Reply to a Comment
exports.replyToComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to reply.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId } = req.params;
        const { reply, username } = req.body;

        if (!postId || !commentId || !reply || !username) {
            const err = new Error("Post ID, comment ID, reply, and username are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const trimmedReply = reply.trim();
        if (!trimmedReply) {
            const err = new Error("Reply cannot be empty.");
            err.status = 400;
            return next(err);
        }

        const replyComment = {
            userId: req.user.id,
            commentId: commentId,
            reply: trimmedReply,
            tagUsername: username,
            createdAt: new Date(),
        };

        comment.replies.push(replyComment);
        await post.save();

        return res.status(201).json({ 
            success: true, 
            replies: comment.replies 
        });
    } catch (error) {
        return next(error);
    }
};

// Edit a Reply
exports.editReply = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId, replyId } = req.params;
        const { reply, username } = req.body;

        if (!postId || !commentId || !replyId || !reply || !username) {
            const err = new Error("Post ID, comment ID, reply ID, new reply, and username are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const replyObj = comment.replies.find(reply => reply._id.toString() === replyId);
        if (!replyObj) {
            const err = new Error("Reply not found.");
            err.status = 404;
            return next(err);
        }

        // Check if the user is the reply's author
        if (replyObj.userId.toString() !== req.user.id) {
            const err = new Error("Unauthorized action. You can only edit your own replies.");
            err.status = 403;
            return next(err);
        }

        const trimmedReply = reply.trim();
        if (!trimmedReply) {
            const err = new Error("Updated reply cannot be empty.");
            err.status = 400;
            return next(err);
        }

        replyObj.reply = trimmedReply;
        replyObj.tagUsername = username; // Update the username if necessary
        replyObj.editedAt = new Date();
        await post.save();

        return res.status(200).json({ success: true, reply: replyObj });
    } catch (error) {
        return next(error);
    }
};

// Delete a Reply
exports.deleteReply = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId, replyId } = req.params;
        const { username } = req.body;

        if (!postId || !commentId || !replyId || !username) {
            const err = new Error("Post ID, comment ID, reply ID, and username are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
        if (replyIndex === -1) {
            const err = new Error("Reply not found.");
            err.status = 404;
            return next(err);
        }

        // Check if the user is the reply's author
        if (comment.replies[replyIndex].userId.toString() !== req.user.id) {
            const err = new Error("Unauthorized action. You can only delete your own replies.");
            err.status = 403;
            return next(err);
        }

        comment.replies.splice(replyIndex, 1);
        await post.save();

        return res.status(200).json({ success: true, message: 'Reply deleted successfully', replies: comment.replies });
    } catch (error) {
        return next(error);
    }
};
