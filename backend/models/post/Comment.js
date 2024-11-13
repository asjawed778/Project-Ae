const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    replies: [{
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
            ref: 'Comment',
            required: true
        },
        reply: {
            type: String,
            trim: true,
            required: true
        },
        upvotes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
            required: false
        }],
        downvotes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
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
    }],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
        required: false
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
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

// Automatically update the 'editedAt' field when a post is modified
commentSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.editedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('Comment', commentSchema);