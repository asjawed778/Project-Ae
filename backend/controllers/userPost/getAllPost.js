const Post = require('../../models/Post');
const User = require('../../models/User'); // Ensure User model is imported

exports.getAllPost = async (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to view posts");
            err.status = 401;
            return next(err);
        }

        // Fetch all posts from the database, populating user information
        const posts = await Post.find()
            .populate({
                path: 'userId', 
                select: 'name avatar _id' 
            })
            .sort({ createdAt: -1 });

        // Format posts to include user data
        // const formattedPosts = posts.map(post => ({
        //     ...post.toObject(),
        //     user: {
        //         id: post.userId._id,
        //         name: post.userId.name,
        //         avatar: post.userId.avatar,
        //     },
        // }));

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
            message: 'Posts fetched successfully',
            posts: formattedPosts,
        });
    } catch (error) {
        // Forward any errors to the error handler middleware
        return next(error);
    }
};
