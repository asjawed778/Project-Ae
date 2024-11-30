const mongoose = require("mongoose");

// Define the RatingAndReview schema
const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
    }
});


module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
