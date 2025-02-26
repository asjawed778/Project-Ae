import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { UploadedFile } from "express-fileupload";
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as AWSservice from '../common/services/AWS.service';
import * as courseService from './course.service';
import * as UserService from '../user/user.service';
import * as CourseCategoryService from "../category/category.service";


export const uploadPublicFile = asyncHandler(async(req: Request, res: Response) => {
    const allowedFields = ["thumbnail", "brouchure", "trailerVideo", "video"];

    // Ensure req.files is not null or undefined
    if (!req.files) {
        throw createHttpError(400, "No files were uploaded.");
    }

    // Find which file is being uploaded
    let fileKey = allowedFields.find(field => req.files?.[field]);

    if (!fileKey) {
        throw createHttpError(400, "Please select a valid file to upload");
    }

    const file = req.files[fileKey] as UploadedFile;

    const uploadPath = `public/course/${fileKey}`;

    const result = await AWSservice.putObject(file, uploadPath);

    res.send(createResponse(result, `${fileKey} uploaded successfully to AWS`));
});

export const addCourseDetails = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = req.body;
    let previousCategoryId: string | null = null;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
        previousCategoryId = course.category?.toString() || null;
    }

    const { category, instructor } = data;

    const isInstrucotrExist = await UserService.getInstructorById(instructor?.toString());
    if(isInstrucotrExist) {
        throw createHttpError(404, "Instructor id is invalid, Not found");
    }
    const isCategoryExist = await CourseCategoryService.getCourseCategoryById(category?.toString());
    if(!isCategoryExist) {
        throw createHttpError(404, "Category id is invalid, Not found");
    }

    const result = await courseService.addCourseDetails(courseId, data);

    if (!result) {
        throw createHttpError(500, "Error in creating/updating course");
    }

    if (previousCategoryId && previousCategoryId !== category?.toString()) {
        await CourseCategoryService.removeCourseId(result._id?.toString(), previousCategoryId);
    }

    await CourseCategoryService.addCourseId(result?._id?.toString(), category?.toString());

    res.send(createResponse(result, "CourseDetails Added/Updated successfully"));
});

export const addAdditionalDetails = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = req.body;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
    }

    const result = await courseService.addAdditionalDetails(courseId, data);
    res.send(createResponse(result, "Additional details added successfully"));
});

export const addCourseStructure = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const { sections } = req.body;

    if(courseId) {
        const course = await courseService.getCourseById(courseId);
        if(!course) {
            throw createHttpError(404, "Course id invalid, course not found")
        }
    }

    const result = await courseService.addCourseStructure(courseId, sections);
    res.send(createResponse({ course: result }, "Course structure added successfully"));
    
});

export const getIntructorList = asyncHandler(async(req: Request, res: Response) => {
    const instructor = await UserService.getInstructorList();
    res.send(createResponse(instructor, "Instructor List fetched"));
});
