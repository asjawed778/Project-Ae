const User = require('../../models/User');
const Post = require('../../models/Post.js');
const { deleteFileFromCloudinary, uploadFileToCloudinary } = require('../../utils/cloudinaryUtils');

exports.updatePost = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized action.");
            err.status = 401; 
            return next(err);
        }

        const postId = req.params.postId;

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

        // Update post content if provided
        if (req.body.content) {
            post.content = req.body.content;
        }

        // Handle file uploads (images/videos)
        if (req.files) {
            // If new images are provided
            if (req.files.images) {
                // Delete existing images from Cloudinary
                for (const imageUrl of post.images) {
                    const publicId = getCloudinaryPublicId(imageUrl);
                    await deleteFileFromCloudinary(publicId);
                }

                // Clear the existing images array
                post.images = [];
                for (const image of req.files.images) {
                    const imageUrl = await uploadFileToCloudinary(image, 'image');
                    post.images.push(imageUrl); // Save uploaded image URL
                }
            }

            // If new videos are provided
            if (req.files.videos) {
                // Delete existing videos from Cloudinary
                for (const videoUrl of post.videos) {
                    const publicId = getCloudinaryPublicId(videoUrl);
                    await deleteFileFromCloudinary(publicId);
                }

                // Clear the existing videos array
                post.videos = [];
                for (const video of req.files.videos) {
                    const videoUrl = await uploadFileToCloudinary(video, 'video');
                    post.videos.push(videoUrl); // Save uploaded video URL
                }
            }
        }

        // Save the updated post to the database
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            post,
        });

    } catch (error) {
        return next(error);
    }
};
