const User = require('../../models/User');
const Post = require('../../models/Post.js');
const { deleteFileFromCloudinary, uploadFileToCloudinary } = require('../../utils/cloudinaryUtils');

const getCloudinaryPublicId = (url) => {
    // Implement logic to extract the public ID from the Cloudinary URL
    // For example: https://res.cloudinary.com/demo/image/upload/v1619201512/sample.jpg
    const segments = url.split('/');
    return segments[segments.length - 1].split('.')[0]; // Extracting the public ID
};

exports.updatePost = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return next(new Error("Unauthorized action.")); 
        }

        const postId = req.params.postId;

        // Check if postId is provided
        if (!postId) {
            return next(new Error("Post ID is missing.")); 
        }

        // Fetch the post from the database
        const post = await Post.findById(postId);
        if (!post) {
            return next(new Error("Post not found.")); 
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
                await Promise.all(post.images.map(async (imageUrl) => {
                    const publicId = getCloudinaryPublicId(imageUrl);
                    await deleteFileFromCloudinary(publicId);
                }));

                // Clear the existing images array
                post.images = await Promise.all(req.files.images.map(async (image) => {
                    return await uploadFileToCloudinary(image, 'image');
                }));
            }

            // If new videos are provided
            if (req.files.videos) {
                // Delete existing videos from Cloudinary
                await Promise.all(post.videos.map(async (videoUrl) => {
                    const publicId = getCloudinaryPublicId(videoUrl);
                    await deleteFileFromCloudinary(publicId);
                }));

                // Clear the existing videos array
                post.videos = await Promise.all(req.files.videos.map(async (video) => {
                    return await uploadFileToCloudinary(video, 'video');
                }));
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
