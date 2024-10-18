const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
        default: [],
        required: false
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
        required: false
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
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
postSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.editedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
