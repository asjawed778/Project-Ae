const Post = require('../../models/post/Post');
const { AvatarGenerator } = require('random-avatar-generator');

exports.getAllPost = async (req, res, next) => {
    try {

        // Get page and limit from query parameters (default values provided)
        const page = Math.max(1, parseInt(req.query.page) || 1);
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

        const generator = new AvatarGenerator();

        const formattedPosts = posts.map(post => ({
            _id: post._id,
            content: post.content,
            images: post.images,
            videos: post.videos,
            createdAt: post.createdAt,
            editedAt: post.editedAt,
            upvotes: post.upvotes,
            downvotes: post.downvotes,
            commentsCounts: post.comments.length,
            user: {
                id: post.userId._id,
                name: post.userId.name,
                username: post.userId.username,
                profilePic: post.userId.profilePic || generator.generateRandomAvatar(),
            }
        }));

        // Get total post count for pagination (wrapped in try-catch)
        let totalPosts;
        try {
            totalPosts = await Post.countDocuments();
        } catch (err) {
            totalPosts = 0;  
        }

        // Return the fetched posts in a successful response
        return res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            posts: formattedPosts,
            currentPage: page,
            hasMore: posts.length === limit
        });
    } catch (error) {
        // Forward any errors to the error handler middleware
        return next(error);
    }
};
