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
                select: 'name avatar _id'
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
            likesCount: post.likes.length,
            commentsCount: post.comments.length,
            user: {
                id: post.userId._id,
                name: post.userId.name,
                avatar: post.userId.avatar || null,
            },
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
