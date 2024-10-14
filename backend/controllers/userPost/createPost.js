const Post = require('../../models/Post');
const User = require('../../models/User'); // Import User model
const { uploadFileToCloudinary } = require('../../utils/cloudinaryUtils');

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
            upvotes: [],  // Initialize upvotes array
            downvotes: [], // Initialize downvotes array
            comments: []   // Initialize comments array for threaded comments
        });

        // Save the post to the database
        await newPost.save();

        // Push the new post's ID to the user's posts array
        await User.findByIdAndUpdate(id, {
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
