const Course = require('../../models/course/Course');
const RatingAndReview = require('../../models/course/RatingAndReviews');


exports.getCourseByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        // Fetch only specific fields and filter by category
        const courses = await Course.find({ category: categoryId })
            .select('courseTitle thumbnail courseMode courseLanguage') // Select specific fields
            .exec();

        if (!courses) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the given category."
            });
        }

        res.status(200).json({
            message: "courses fetched",
            success: true,
            courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
            Error: error.message
        });
    }
};

exports.getFullCourseDetails = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate({
                path: 'courseContent', 
                select: 'topicName subTopic', 
                populate: {
                    path: 'subTopic', 
                    select: 'title description', 
                },
            })
            .populate({
                path: 'ratingAndReviews', 
                select: 'rating review', 
                populate: {
                    path: 'user', 
                    select: 'name profilePic', 
                },
            })
            .populate({
                path: 'category',
                select: 'categoryName'
            })
            .exec();

        // Check if course exists
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        // Return success response with course details
        res.status(200).json({
            success: true,
            message: "Course fetched successfully.",
            course,
        });
    } catch (error) {
        console.error("Error fetching full course details:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
            error: error.message, // Provide detailed error for debugging
        });
    }
};

exports.getAllCourse = async (req, res, next) => {
    try {
        const allCourse = await Course.find()
            .select('courseTitle thumbnail courseMode courseLanguage') // Select specific fields
            .exec();

        if (!allCourse) {
            return res.status(404).json({
                success: false,
                message: "No courses found."
            });
        }

        res.status(200).json({
            success: true,
            message: "All course fetched successfully",
            allCourse
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error in fetching all course. Please try again later.",
            Error: error.message
        });
    }
}

