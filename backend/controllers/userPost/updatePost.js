const Post = require('../../models/post/Post');
const { deleteFileFromCloudinary, uploadFileToCloudinary } = require('../../utils/cloudinaryUtils');

const getCloudinaryPublicId = (url) => {
    const segments = url.split('/');
    return segments[segments.length - 1].split('.')[0];
};

exports.updatePost = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to update the post.");
            err.status = 401;
            return next(err);
        }
        const { id } = req.user;
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

        // Ensure the post belongs to the authenticated user
        if (post.userId.toString() !== id.toString()) {
            const err = new Error("You are not authorized to update this post.");
            err.status = 401;
            return next(err);
        }

        const { content } = req.body;

        // Validate the content of the post
        if (!content || !content.trim()) {
            const err = new Error("Post content can't be empty.");
            err.status = 400;
            return next(err);
        }

        // Update the content if provided
        post.content = content.trim();

        // Constants for validation
        const MAX_IMAGE_SIZE_MB = 5 * 1024 * 1024; // 5MB for images
        const MAX_VIDEO_SIZE_MB = 20 * 1024 * 1024; // 20MB for videos
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const allowedVideoTypes = ['video/mp4', 'video/quicktime'];

        if (req.files) {
            // Normalize images and videos to arrays
            const images = req.files.images ? (Array.isArray(req.files.images) ? req.files.images : [req.files.images]) : [];
            const videos = req.files.videos ? (Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos]) : [];

            // Validate images (type and size)
            for (let image of images) {
                if (!allowedImageTypes.includes(image.mimetype)) {
                    const err = new Error("Invalid image type. Only jpg, jpeg, and png are allowed.");
                    err.status = 400;
                    return next(err);
                }
                if (image.size > MAX_IMAGE_SIZE_MB) {
                    const err = new Error(`Image size should be less than ${MAX_IMAGE_SIZE_MB / (1024 * 1024)}MB.`);
                    err.status = 400;
                    return next(err);
                }
            }

            // Validate videos (type and size)
            for (let video of videos) {
                if (!allowedVideoTypes.includes(video.mimetype)) {
                    const err = new Error("Invalid video type. Only mp4 and mov are allowed.");
                    err.status = 400;
                    return next(err);
                }
                if (video.size > MAX_VIDEO_SIZE_MB) {
                    const err = new Error(`Video size should be less than ${MAX_VIDEO_SIZE_MB / (1024 * 1024)}MB.`);
                    err.status = 400;
                    return next(err);
                }
            }

            // Handle new images
            if (images.length > 0) {
                // Delete old images from Cloudinary
                try {
                    await Promise.all(post.images.map(async (imageUrl) => {
                        const publicId = getCloudinaryPublicId(imageUrl);
                        await deleteFileFromCloudinary(publicId);
                    }));

                    // Upload new images to Cloudinary
                    post.images = await Promise.all(images.map(async (image) => {
                        return await uploadFileToCloudinary(image, 'image');
                    }));
                } catch (error) {
                    const err = new Error("Failed to upload new images.");
                    err.status = 500;
                    return next(err);
                }
            }

            // Handle new videos
            if (videos.length > 0) {
                // Delete old videos from Cloudinary
                try {
                    await Promise.all(post.videos.map(async (videoUrl) => {
                        const publicId = getCloudinaryPublicId(videoUrl);
                        await deleteFileFromCloudinary(publicId);
                    }));

                    // Upload new videos to Cloudinary
                    post.videos = await Promise.all(videos.map(async (video) => {
                        return await uploadFileToCloudinary(video, 'video');
                    }));
                } catch (error) {
                    const err = new Error("Failed to upload new videos.");
                    err.status = 500;
                    return next(err);
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
