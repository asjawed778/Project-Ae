const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            tagUsername: {
                type: String,
                required: true
            },
            commentId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            reply: {
                type: String,
                required: true
            },
            upvotes: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false
            }],
            downvotes: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false
            }],
            createdAt: {
                type: Date,
                default: Date.now
            },
            editedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date,
        default: Date.now
    }
});

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
    images: [{
        type: String,
        required: false
    }],
    videos: [{
        type: String,
        required: false
    }],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date,
        default: Date.now
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
