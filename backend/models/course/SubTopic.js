const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timeDuration: {
        type: String,
        default: null
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String,
        default: null
    },
});

module.exports = mongoose.model("SubTopic", subTopicSchema);