const mongoose = require('mongoose');

const additionalDetailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("AdditionalDetails", additionalDetailsSchema);
