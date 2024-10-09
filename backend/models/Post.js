const mongoose = require('mongoose');

// Define the user post schema
const userPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        maxlength: 200,
        required: true
    },
    images: [
        {
            type: String,
            required: false
        }
    ],
    videos: [
        {
            type: String,
            required: false
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date
    }
});

// Automatically update the 'editedAt' field when a post is modified
userPostSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.editedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('Post', userPostSchema);
