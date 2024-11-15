const Course = require('../../models/course/Course');

exports.getCourseByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        // Fetch only specific fields and filter by category
        const courses = await Course.find({ category: categoryId })
            .select('courseTitle thumbnail courseMode courseLanguage') // Select specific fields
            .exec();

        if (!courses || courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the given category."
            });
        }

        res.status(200).json({
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
                    select: 'title description'
                }
            })
            .populate('ratingAndReviews', 'rating comment')
            .populate('category', 'name')
            .exec();


        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "course fetched succesfully",
            course
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
};

exports.getAllCourse = async (req, res, next) => {
    try {
        const allCourse = await Course.find()
            .select('courseTitle thumbnail courseMode courseLanguage') // Select specific fields
            .exec();

        if (!allCourse || allCourse.length === 0) {
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

