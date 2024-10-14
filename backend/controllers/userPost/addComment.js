const Post = require('../../models/Post');

exports.addComment = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user; 
        const { postId } = req.params; 

        // Check if postId is provided
        if (!postId) {
            const err = new Error("Post ID is missing.");
            err.status = 400;
            return next(err);
        }

        // Fetch the post from the database
        const post = await Post.findById(postId);
        if (!post) {
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }

        // Validate comment input
        const { comment } = req.body;
        if (!comment || comment.trim() === '') {
            const err = new Error("Comment cannot be empty.");
            err.status = 400;
            return next(err);
        }

        // Add the new comment to the post's comments array
        post.comments.push({
            userId: id,  
            comment: comment,  
            createdAt: new Date() 
        });

        // Save the updated post to the database
        await post.save();

        // Return a success response with the updated comments
        return res.status(200).json({
            success: true,
            message: 'Comment added successfully',
            comments: post.comments  
        });

    } catch (error) {
        return next(error);  
    }
};
