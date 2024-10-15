const Post = require('../../models/Post');

exports.getAllPost = async (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view posts");
            err.status = 401;
            return next(err);
        }

        // Get page and limit from query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the number of posts to skip
        const skip = (page - 1) * limit;

        // Fetch posts from the database with pagination
        const posts = await Post.find()
            .populate({
                path: 'userId',
                select: 'name profilePic _id username'
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const formattedPosts = posts.map(post => ({
            _id: post._id,
            content: post.content,
            images: post.images,
            videos: post.videos,
            createdAt: post.createdAt,
            editedAt: post.editedAt,
            upvotesCount: post.upvotes.length,
            downvotesCount: post.downvotes.length,
            commentsCount: post.comments.length,
            comments: post.comments.map(comment => ({
                _id: comment._id,
                userId: comment.userId,
                comment: comment.comment,
                createdAt: comment.createdAt,
                replies: comment.replies || []
            })),
            user: {
                id: post.userId._id,
                name: post.userId.name,
                username: post.userId.username,
                profilePic: post.userId.profilePic || null,
            }
        }));

        // Return the fetched posts in a successful response
        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            posts: formattedPosts,
            currentPage: page,
            totalPosts: await Post.countDocuments(),
        });
    } catch (error) {
        // Forward any errors to the error handler middleware
        return next(error);
    }
};
