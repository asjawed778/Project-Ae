const Post = require('../../models/Post');

exports.getUserAllPost = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view posts");
            err.status = 401;
            return next(err);
        }
        const { id } = req.user;

        // Get page and limit from query parameters
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        // Find all posts created by the user with pagination
        const posts = await Post.find({ userId: id })
            .populate('userId', 'name avatar')
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
            message: 'User posts fetched successfully',
            posts: formattedPosts,
            page: page,       
            hasMore: posts.length === limit 
        });
    } catch (error) {
        return next(error);
    }
};
