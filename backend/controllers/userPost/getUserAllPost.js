const Post = require('../../models/post/Post');
const { AvatarGenerator } = require('random-avatar-generator');


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
            .populate('userId', 'name username profilePic')
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
            commentsCount: post.comments.length,
            user: {
                id: post.userId._id,
                name: post.userId.name,
                username: post.userId.username,
                profilePic: post.userId.profilePic || generator.generateRandomAvatar(),
            }
        }));

        // Return the fetched posts in a successful response
        return res.status(200).json({
            success: true,
            message: 'User posts fetched successfully',
            posts: formattedPosts,
            currentPage: page,
            hasMore: posts.length === limit
        });
    } catch (error) {
        return next(error);
    }
};
