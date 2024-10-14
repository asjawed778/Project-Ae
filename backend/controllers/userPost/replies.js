const Post = require('../../models/Post');

exports.replyToComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized action." });
        }

        const { postId, commentId } = req.params;
        const { reply } = req.body;

        if (!postId || !commentId || !reply) {
            return res.status(400).json({ message: "Post ID, comment ID, and reply are required." });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found." });
        }

        const replyComment = {
            userId: req.user.id,
            reply: reply,
            createdAt: new Date(),
        };

        post.comments[commentIndex].replies.push(replyComment);
        await post.save();

        return res.status(201).json({ success: true, comments: post.comments });
    } catch (error) {
        return next(error);
    }
};

exports.editReply = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized action." });
        }

        const { postId, commentId, replyId } = req.params;
        const { reply } = req.body;

        if (!postId || !commentId || !replyId || !reply) {
            return res.status(400).json({ message: "Post ID, comment ID, reply ID, and new reply are required." });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
        if (replyIndex === -1) {
            return res.status(404).json({ message: "Reply not found." });
        }

        comment.replies[replyIndex].reply = reply;
        await post.save();

        return res.status(200).json({ success: true, comments: post.comments });
    } catch (error) {
        return next(error);
    }
};

exports.deleteReply = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized action." });
        }

        const { postId, commentId, replyId } = req.params;

        if (!postId || !commentId || !replyId) {
            return res.status(400).json({ message: "Post ID, comment ID, and reply ID are required." });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
        if (replyIndex === -1) {
            return res.status(404).json({ message: "Reply not found." });
        }

        comment.replies.splice(replyIndex, 1); // Remove the reply from the replies array
        await post.save();

        return res.status(200).json({ success: true, comments: post.comments });
    } catch (error) {
        return next(error);
    }
};
