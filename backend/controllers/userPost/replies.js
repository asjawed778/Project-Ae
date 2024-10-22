const Comment = require('../../models/Comment');
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
        const { reply, tagUsername } = req.body;

        if (!postId || !commentId || !reply || !tagUsername) {
            const err = new Error("Post ID, comment ID, reply, and tagUsername are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        // Check if the comment belongs to this post
        if (!post.comments.includes(commentId)) {
            const err = new Error("Comment does not belong to this post.");
            err.status = 404;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
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
            tagUsername,
            createdAt: new Date(),
            upvotes: [],
            downvotes: []
        };

        comment.replies.push(replyComment);
        await comment.save();

        return res.status(201).json({
            success: true,
            replies: comment.replies
        });
    } catch (error) {
        return next(error);
    }
};

// edit reply
exports.editReply = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId, replyId } = req.params;
        const { reply, tagUsername } = req.body;

        if (!postId || !commentId || !replyId || !reply || !tagUsername) {
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

        // Check if the comment belongs to this post
        if (!post.comments.includes(commentId)) {
            const err = new Error("Comment does not belong to this post.");
            err.status = 404;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
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

        // Update reply properties
        replyObj.reply = trimmedReply;
        replyObj.tagUsername = tagUsername;
        replyObj.editedAt = new Date();

        // Save the updated comment
        await comment.save();

        return res.status(200).json({ 
            success: true, 
            reply: replyObj 
        });
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

        if (!postId || !commentId || !replyId) {
            const err = new Error("Post ID, comment ID, and reply ID are required.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        // Check if the comment belongs to this post
        if (!post.comments.includes(commentId)) {
            const err = new Error("Comment does not belong to this post.");
            err.status = 404;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
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

        // Check if the user is the post's author or the reply's author
        const isPostOwner = post.userId.toString() === req.user.id; // Assuming post has a userId field
        const isReplyOwner = comment.replies[replyIndex].userId.toString() === req.user.id;

        if (!isPostOwner && !isReplyOwner) {
            const err = new Error("Unauthorized action. You can only delete your own replies or replies on your own post.");
            err.status = 403;
            return next(err);
        }

        // Remove the reply from the replies array
        comment.replies.splice(replyIndex, 1);
        
        // Save the updated comment
        await comment.save();

        return res.status(200).json({ 
            success: true, 
            message: 'Reply deleted successfully', 
            replies: comment.replies 
        });
    } catch (error) {
        return next(error);
    }
};

// Vote on a Reply
exports.voteReply = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { postId, commentId, replyId } = req.params;
        const { voteType } = req.body; 

        if (!postId || !commentId || !replyId || !voteType) {
            const err = new Error("Post ID, comment ID, reply ID, and vote type are required.");
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

        // Update votes based on vote type
        if (voteType === 'upvote') {
            if (!replyObj.upvotes.includes(req.user.id)) {
                replyObj.upvotes.push(req.user.id);
                // Remove downvote if it exists
                const downvoteIndex = replyObj.downvotes.indexOf(req.user.id);
                if (downvoteIndex !== -1) {
                    replyObj.downvotes.splice(downvoteIndex, 1);
                }
            } else {
                const err = new Error("You have already upvoted this reply.");
                err.status = 400;
                return next(err);
            }
        } else if (voteType === 'downvote') {
            if (!replyObj.downvotes.includes(req.user.id)) {
                replyObj.downvotes.push(req.user.id);
                // Remove upvote if it exists
                const upvoteIndex = replyObj.upvotes.indexOf(req.user.id);
                if (upvoteIndex !== -1) {
                    replyObj.upvotes.splice(upvoteIndex, 1);
                }
            } else {
                const err = new Error("You have already downvoted this reply.");
                err.status = 400;
                return next(err);
            }
        } else {
            const err = new Error("Invalid vote type. Use 'upvote' or 'downvote'.");
            err.status = 400;
            return next(err);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: `Reply ${voteType}d successfully.`,
            reply: replyObj,
        });
    } catch (error) {
        return next(error);
    }
};
