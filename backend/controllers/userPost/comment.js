const Post = require('../../models/post/Post');
const Comment = require('../../models/post/Comment');
const { AvatarGenerator } = require('random-avatar-generator');

// Add a comment to a post
exports.addComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to comment");
            err.status = 401;
            return next(err);
        }

        const { postId } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

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

        const newComment = new Comment({
            userId,
            postId,
            comment,
            replies: [],
            upvotes: [],
            downvotes: []
        });

        await newComment.save();
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
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
        const userId = req.user.id;

        if (!postId || !commentId) {
            const err = new Error("Post ID or Comment ID is missing.");
            err.status = 400;
            return next(err);
        }

        const post = await Post.findById(postId).populate('comments');
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const isCommentOwner = comment.userId.toString() === userId;
        const isPostOwner = post.userId.toString() === userId;

        if (!isCommentOwner && !isPostOwner) {
            const err = new Error("Only the comment's author or the post's owner can delete this comment.");
            err.status = 403;
            return next(err);
        }

        post.comments = post.comments.filter(c => c._id.toString() !== commentId);
        await post.save();

        // Delete the comment using deleteOne()
        await Comment.deleteOne({ _id: commentId });

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
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
        const userId = req.user.id;

        if (!postId || !commentId || !updatedComment?.trim()) {
            const err = new Error("Post ID, Comment ID, and updated comment text are required.");
            err.status = 400;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const isCommentOwner = comment.userId.toString() === userId;

        if (!isCommentOwner) {
            const err = new Error("Only the comment's author can edit this comment.");
            err.status = 403;
            return next(err);
        }

        comment.comment = updatedComment.trim();
        comment.editedAt = new Date();

        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment edited successfully',
            comment: comment
        });
    } catch (error) {
        next(error);
    }
};

// get comments 
exports.getComments = async (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view comments");
            err.status = 401;
            return next(err);
        }

        // Get page and limit from query parameters (default values provided)
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the number of posts to skip
        const skip = (page - 1) * limit;

        const { postId } = req.params;
        // Validate postId
        if (!postId) {
            const err = new Error("Post ID is required.");
            err.status = 400;
            return next(err);
        }

        // Fetch the post to ensure it exists
        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        // Fetch comments for the post
        const comments = await Comment.find({ postId })
            .populate({
                path: 'userId',
                select: 'name profilePic _id username'
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const generator = new AvatarGenerator();

        const formattedComments = comments.map(comment => ({
            _id: comment._id,
            comment: comment.comment,
            createdAt: comment.createdAt,
            editedAt: comment.editedAt,
            replies: comment.replies,
            user: {
                id: comment.userId._id,
                name: comment.userId.name,
                username: comment.userId.username,
                profilePic: comment.userId.profilePic || generator.generateRandomAvatar(),
            },
            upvotes: comment.upvotes,
            downvotes: comment.downvotes,
        }));

        // Return the fetched comments in a successful response
        return res.status(200).json({
            success: true,
            message: 'Comments fetched successfully',
            comments: formattedComments,
            commentsCount: formattedComments.length,
        });
    } catch (error) {
        // Forward any errors to the error handler middleware
        return next(error);
    }
};

// Vote on a comment
exports.voteComment = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to vote on comments");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user;
        const { postId, commentId } = req.params;
        const { action } = req.body;

        // Validate action presence
        if (!postId || !commentId) {
            const err = new Error("PostId or Comment ID is missing.");
            err.status = 400;
            return next(err);
        }

        if (!action) {
            const err = new Error("Action(Vote Type) is required.");
            err.status = 400;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            const err = new Error("Comment not found.");
            err.status = 404;
            return next(err);
        }

        const isUpvoted = comment.upvotes.includes(id);
        const isDownvoted = comment.downvotes.includes(id);

        if (action === "upvote") {
            if (isUpvoted) {
                comment.upvotes = comment.upvotes.filter(userId => String(userId) !== String(id));
            } else {
                if (isDownvoted) {
                    comment.downvotes = comment.downvotes.filter(userId => String(userId) !== String(id));
                }
                comment.upvotes.push(id);
            }
        } else if (action === "downvote") {
            if (isDownvoted) {
                comment.downvotes = comment.downvotes.filter(userId => String(userId) !== String(id));
            } else {
                if (isUpvoted) {
                    comment.upvotes = comment.upvotes.filter(userId => String(userId) !== String(id));
                }
                comment.downvotes.push(id);
            }
        } else {
            const err = new Error("Invalid action. Must be 'upvote' or 'downvote'.");
            err.status = 400;
            return next(err);
        }

        await comment.save();

        return res.status(200).json({
            success: true,
            message: action === "upvote" ?
                (isUpvoted ? 'Comment upvote removed successfully' : 'Comment upvoted successfully') :
                (isDownvoted ? 'Comment downvote removed successfully' : 'Comment downvoted successfully'),
            upvotesCount: comment.upvotes.length,
            downvotesCount: comment.downvotes.length,
            comment: {
                _id: comment._id,
                upvotes: comment.upvotes,
                downvotes: comment.downvotes,
            }
        });
    } catch (error) {
        next(error);
    }
};


