import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import fileUpload, { UploadedFile } from "express-fileupload";
import createHttpError from 'http-errors';
import { createResponse } from '../common/helper/response.hepler';
import * as AWSservice from '../common/services/AWS.service';
import * as courseService from './course.service';


interface CustomRequest extends Request {
    files?: {
        file?: UploadedFile;
    };
}


// interface CustomRequest extends Request {
//     files?: fileUpload.FileArray;
// }

export const uploadfile = asyncHandler(async (req: Request, res: Response) => {
    const allowedFields = ["thumbnail", "brouchure", "trailerVideo", "video"];

    // Ensure req.files is not null or undefined
    if (!req.files) {
        throw createHttpError(400, "No files were uploaded.");
    }
    console.log(req.files);

    // Find which file is being uploaded
    let fileKey = allowedFields.find(field => req.files?.[field]);

    if (!fileKey) {
        throw createHttpError(400, "Please select a valid file to upload");
    }

    const file = req.files[fileKey] as UploadedFile;

    const uploadPath = `uploads/${fileKey}`;

    // Upload to AWS S3
    const result = await AWSservice.putObject(file, uploadPath);

    res.send(createResponse(result, `${fileKey} uploaded successfully to AWS`));
});



export const addCourseDetails = asyncHandler(async(req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = req.body;

    const result = await courseService.addCourseDetails(courseId, data);
    res.send(createResponse(result, "CourseDetails Added successfully"));
});