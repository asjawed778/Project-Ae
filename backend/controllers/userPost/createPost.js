const Post = require('../../models/post/Post');
const User = require('../../models/user/User');
const AdditionalDetails = require('../../models/user/AdditionalDetails');
const { uploadFileToCloudinary } = require('../../utils/cloudinaryUtils');

// Allowed file types and size limits
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/mov', 'video/avi'];
const MAX_IMAGE_SIZE_MB = 5 * 1024 * 1024; // 5 MB per image
const MAX_VIDEO_SIZE_MB = 20 * 1024 * 1024; // 20 MB per video

exports.createPost = async (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            const err = new Error("Please login to create a post");
            err.status = 401;
            return next(err);
        }

        const { id } = req.user;
        const { content } = req.body;

        const user = await User.findById(id);
        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            return next(err);
        }

        // Ensure images and videos are arrays, even if they don't exist
        const images = req.files && req.files.images ? (Array.isArray(req.files.images) ? req.files.images : [req.files.images]) : [];
        const videos = req.files && req.files.videos ? (Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos]) : [];

        // Content is required
        if (!content) {
            const err = new Error("Content is required.");
            err.status = 400;
            return next(err);
        }

        // Validate content length
        if (content.length > 200) {
            const err = new Error("Content cannot exceed 200 characters.");
            err.status = 400;
            return next(err);
        }

        // Validate max number of images (max 10)
        if (images.length > 10) {
            const err = new Error("You can upload up to 10 images only.");
            err.status = 400;
            return next(err);
        }

        // Validate max number of videos (max 5)
        if (videos.length > 5) {
            const err = new Error("You can upload up to 5 videos only.");
            err.status = 400;
            return next(err);
        }

        // Validate image file types and sizes
        for (let image of images) {
            if (!ALLOWED_IMAGE_TYPES.includes(image.mimetype)) {
                const err = new Error("Invalid image format. Allowed formats: jpg, jpeg, png, gif.");
                err.status = 400;
                return next(err);
            }

            if (image.size > MAX_IMAGE_SIZE_MB) {
                const err = new Error(`Image size cannot exceed ${MAX_IMAGE_SIZE_MB / (1024 * 1024)} MB.`);
                err.status = 400;
                return next(err);
            }
        }

        // Validate video file types and sizes
        for (let video of videos) {
            if (!ALLOWED_VIDEO_TYPES.includes(video.mimetype)) {
                const err = new Error("Invalid video format. Allowed formats: mp4, mov, avi.");
                err.status = 400;
                return next(err);
            }

            if (video.size > MAX_VIDEO_SIZE_MB) {
                const err = new Error(`Video size cannot exceed ${MAX_VIDEO_SIZE_MB / (1024 * 1024)} MB.`);
                err.status = 400;
                return next(err);
            }
        }

        // Upload images to Cloudinary if any
        const imagePaths = images.length > 0 ? await uploadFileToCloudinary(images, 'UrbanSole', 80) : [];

        // Upload videos to Cloudinary if any
        const videoPaths = videos.length > 0 ? await uploadFileToCloudinary(videos, 'UrbanSole', 80) : [];

        // Map uploaded files to URLs
        const imageUrls = imagePaths.map(image => image.secure_url);
        const videoUrls = videoPaths.map(video => video.secure_url);

        // Create new post document
        const newPost = new Post({
            userId: id,
            content,
            images: imageUrls,
            videos: videoUrls,
            upvotes: [],
            downvotes: [],
            comments: []
        });

        // Save the post to the database
        await newPost.save();

        const userDetailsId = user.additionalDetails;

        // Push the new post's ID to the user's posts array
        await AdditionalDetails.findByIdAndUpdate(userDetailsId, {
            $push: { posts: newPost._id }
        });

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: newPost
        });
    } catch (err) {
        // Catch and forward any errors
        return next(err);
    }
};
