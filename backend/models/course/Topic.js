const mongoose = require("mongoose");

// Define the Section schema
const topicSchema = new mongoose.Schema({
	topicName: {
		type: String,
		required: true,
	},
	subTopic: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "SubTopic",
		},
	],
});

module.exports = mongoose.model("Topic", topicSchema);