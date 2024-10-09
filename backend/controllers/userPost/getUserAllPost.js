const Post = require('../../models/Post');

exports.getUserAllPost = async (req, res, next) => {
    try {

        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view posts");
            err.status = 401;
            return next(err);
        }
        const { id } = req.user;

        // Find all posts created by the user
        const posts = await Post.find({ userId: id })
            .populate('userId', 'name avatar')
            .sort({ createdAt: -1 });

        const formattedPosts = posts.map(post => ({
            _id: post._id,
            content: post.content,
            images: post.images,
            videos: post.videos,
            createdAt: post.createdAt,
            editedAt: post.editedAt,
            __v: post.__v,
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
            posts: formattedPosts
        });
    } catch (error) {
        return next(error);
    }
};
