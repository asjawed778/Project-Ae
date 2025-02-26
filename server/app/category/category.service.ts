import createHttpError from "http-errors";
import courseCategorySchema from "./category.schema";
import { ICourseCategory } from "./category.dto";
import mongoose from "mongoose";

export const createCourseCategory = async(data : ICourseCategory) => {
    if(await courseCategorySchema.exists({name: data.name})) {
        throw createHttpError(409, "Course category already exists");
    }
    const result = await courseCategorySchema.create(data);
    return result as ICourseCategory;
};

export const updateCourseCategory = async (categoryId: string, data: ICourseCategory) => {

    const existingCategory = await courseCategorySchema.findOne({
        name: data.name,
        _id: { $ne: categoryId },
    });

    if (existingCategory) {
        throw createHttpError(409, "Category name already exists");
    }
    // Update the category if the name is unique
    const result = await courseCategorySchema.findByIdAndUpdate(categoryId, data, { new: true });

    if (!result) {
        throw createHttpError(404, "Course category not found");
    }

    return result as ICourseCategory;
};

export const deleteCourseCategory = async (categoryId: string) => {
    const category = await courseCategorySchema.findById(categoryId);
    if(category?.courses?.length) {
        throw createHttpError(409, "Cannot delete category which have a course");
    }
    const result = await courseCategorySchema.findByIdAndDelete(categoryId);

    if (!result) {
        throw createHttpError(404, "Course category not found");
    }
};

export const getAllCourseCategory = async () => {
    const result = await courseCategorySchema.find();
    return result as ICourseCategory[];
};

export const getCourseCategoryById = async (categoryId: string) => {
    console.log(categoryId);
    const result = await courseCategorySchema.findById(categoryId);
    console.log(result)
    if (!result) {
        throw createHttpError(404, "Course category not found");
    }
    return result as ICourseCategory;
};

export const addCourseId = async(courseId: string, categoryId: string) => {
    const category = await courseCategorySchema.findByIdAndUpdate(categoryId, 
        {$push: {courses: courseId}},
        { new: true }
    )

    if(!category) {
        throw createHttpError(404, "Invalid category id")
    }
    return category;
};

export const removeCourseId = async (courseId: string, categoryId: string) => {
    const category = await courseCategorySchema.findByIdAndUpdate(
        categoryId,
        { $pull: { courses: courseId } },
        { new: true }
    );

    if (!category) {
        throw createHttpError(404, "Invalid category ID");
    }
    return category;
};

export const getPublishedCoursesByCategory = async (categoryId: string, pageNo: number = 1) => {
    const isCategoryExist = await courseCategorySchema.exists({ _id: categoryId });
    if (!isCategoryExist) {
        throw createHttpError(404, "Invalid category Id, Category not found");
    }
    const pageSize = 10; // Number of courses per page
    const skip = (pageNo - 1) * pageSize; // Calculate the number of documents to skip

    const result = await courseCategorySchema.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(categoryId) }
        },
        {
            $lookup: {
                from: "courselifecycles",
                localField: "courses",
                foreignField: "PUBLISHED",
                as: "publishedCourses"
            }
        },
        {
            $unwind: "$publishedCourses"
        },
        {
            $lookup: {
                from: "courses",
                localField: "publishedCourses.PUBLISHED",
                foreignField: "_id",
                as: "courseDetails"
            }
        },
        {
            $unwind: "$courseDetails"
        },
        {
            $project: {
                _id: "$courseDetails._id",
                title: "$courseDetails.title",
                subtitle: "$courseDetails.subtitle",
                thumbnail: "$courseDetails.thumbnail",
                language: "$courseDetails.language",
                courseMode: "$courseDetails.courseMode"
            }
        },
        { $skip: skip }, // Skip previous pages
        { $limit: pageSize } // Limit results per page
    ]);

    return {
        success: true,
        totalCourses: result.length,
        page: pageNo,
        pageSize,
        courses: result
    };
};



