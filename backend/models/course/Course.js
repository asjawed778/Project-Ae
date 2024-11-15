const mongoose = require("mongoose")

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
        trim: true
    },
    courseSubTitle: {
        type: String,
        required: true,
        trim: true
    },
    keyPoints: [{
        type: String,
        trim: true
    }],
    tags: [{
        type: String,
    }],
    courseDescription: {
        type: String,
        required: true,
    },
    courseMode: {
        type: String,
        required: true,
    },
    courseLanguage: {
        type: String,
        required: true,
    },
    brochure: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
        },
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    thumbnail: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    studentsEnroled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model("Course", coursesSchema)