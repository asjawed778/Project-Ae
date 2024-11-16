const { checkFileType, uploadFileToCloudinary } = require("../../utils/cloudinaryUtils");
const Category = require('../../models/course/Category');
const SubTopic = require('../../models/course/SubTopic');
const Topic = require('../../models/course/Topic');
const Course = require("../../models/course/Course");
const { putObject } = require("../../utils/AWS_S3_Utils");


exports.addCourse = async (req, res, next) => {
    try {
        const {
            courseTitle,
            courseSubTitle,
            keyPoints,
            tags,
            courseDescription,
            courseMode,
            courseLanguage,
            courseContent,
            category,
        } = req.body;

        let { brochure, thumbnail } = req.files || {};

        //changes
        const parsedContent = JSON.parse(courseContent);

        if (!Array.isArray(parsedContent)) {
            const err = new Error("Please send course content as an arry of Topic, and Topic is also array of subTopic");
            err.status = 400;
            return next(err);
        }

        if (!courseTitle || !courseSubTitle || !courseDescription || !courseMode || !courseLanguage || !category) {
            const err = new Error("Please fill all the details, including course content as an array");
            err.status = 400;
            return next(err);
        }
        if (!Array.isArray(keyPoints)) {
            const err = new Error("Please send at lest one key point as an array");
            err.status = 400;
            return next(err);
        }
        if (!Array.isArray(tags)) {
            const err = new Error("Please send at lest one tag as an array");
            err.status = 400;
            return next(err);
        }


        if (!thumbnail) {
            const err = new Error("Please upload a Thumbnail");
            err.status = 400;
            return next(err);
        }

        if (Array.isArray(brochure) && brochure.length > 1) {
            brochure = brochure[brochure.length - 1];
        }

        if (Array.isArray(thumbnail) && thumbnail.length > 1) {
            thumbnail = thumbnail[thumbnail.length - 1];
        }

        if (brochure && !checkFileType(brochure?.name, ['pdf'])) {
            const err = new Error("Invalid brochure file type. Please upload a PDF file.");
            err.status = 400;
            return next(err);
        }

        if (thumbnail && !checkFileType(thumbnail?.name, ['jpg', 'jpeg', 'png'])) {
            const err = new Error("Invalid thumbnail file type. Please upload an image file.");
            err.status = 400;
            return next(err);
        }

        const existCategory = await Category.findById(category);
        if (!existCategory) {
            const err = new Error("Category not found.");
            err.status = 404;
            return next(err);
        }

        // Parallel upload for better efficiency
        const [thumbnail_res, brochur_res] = await Promise.all([
            // uploadFileToCloudinary(thumbnail, "AbilitaEdge", 100),
            // uploadFileToCloudinary(brochure, "AbilitaEdge", 100),
            putObject(thumbnail, "Course"),
            putObject(brochure, "Course")
        ]);

        // const thumbnailUrl = thumbnail_res[0].url.toString();
        // const brochureUrl = brochur_res[0].url.toString();

        const newCourseContent = [];


        for (const topic of parsedContent) {
            const { topicName, subTopic } = topic;
            if (!topicName || !Array.isArray(subTopic)) {
                const err = new Error("Please fill details in Topic and their subtopic");
                err.status = 400;
                return next(err);
            }

            const newTopic = new Topic({ topicName });

            const subTopicPromises = subTopic.map(async (subTopicItem) => {
                const { title, description } = subTopicItem;
                if (!title) {
                    const err = new Error("Please fill Title of each subtopic");
                    err.status = 400;
                    return next(err);
                }
                const newSubTopic = await SubTopic.create({
                    title,
                    description: description || ""
                });
                newTopic.subTopic.push(newSubTopic._id);
            });

            await Promise.all(subTopicPromises);
            await newTopic.save();
            newCourseContent.push(newTopic._id);
        }

        const newCourse = new Course({
            courseTitle,
            courseSubTitle,
            keyPoints,
            tags,
            courseDescription,
            courseMode,
            courseLanguage,
            brochure: brochur_res,
            thumbnail: thumbnail_res,
            category,
            courseContent: newCourseContent
        });

        await newCourse.save();

        existCategory.courses.push(newCourse._id);
        await existCategory.save();

        res.status(200).json({
            success: true,
            message: "Course added successfully",
            course: newCourse
        });

    } catch (error) {
        console.error("Error in addCourse:", error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
};