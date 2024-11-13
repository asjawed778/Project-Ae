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
        type: mongoose.Schema.Types.ObjectId;
        ref: 'Tag'
    }],
    courseDescription: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price: {
        type: Number,
    },
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
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    createdAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model("Course", coursesSchema)