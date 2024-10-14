const Post = require('../../models/Post');

exports.getAllComments = async (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view comments");
            err.status = 401;
            return next(err);
        }

        const { postId } = req.params; 

        // Get page and limit from query parameters
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        // Find the post by ID and populate user details for comments
        const post = await Post.findById(postId)
            .populate({
                path: 'comments.userId',
                select: 'name avatar'
            })
            .select('comments'); 

        // Check if the post exists
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Get the comments with pagination
        const comments = post.comments.slice(skip, skip + limit);

        // Format comments and their replies
        const formattedComments = comments.map(comment => {
            const replies = comment.replies || []; // Ensure replies exist

            return {
                _id: comment._id,
                content: comment.comment, 
                createdAt: comment.createdAt,
                user: {
                    id: comment.userId._id, 
                    name: comment.userId.name, 
                    avatar: comment.userId.avatar || null,
                },
                replies: replies.map(reply => ({
                    _id: reply._id,
                    content: reply.reply,
                    createdAt: reply.createdAt,
                    user: {
                        id: reply.userId, 
                        name: reply.userId.name, 
                        avatar: reply.userId.avatar || null,
                    }
                }))
            };
        });

        // Return the fetched comments in a successful response
        return res.status(200).json({
            success: true,
            message: 'Comments fetched successfully',
            comments: formattedComments,
            page: page, 
            hasMore: post.comments.length > skip + limit // Check if there are more comments
        });
    } catch (error) {
        return next(error);
    }
};
