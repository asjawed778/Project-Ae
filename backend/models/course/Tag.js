const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});

// Export the Tags model
module.exports = mongoose.model("Tag", tagSchema);