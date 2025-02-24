
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
    .post("/thumbnail", fileUploadMiddleware.thumbnailUpload, catchError, courseController.uploadfile)
    .post("/brouchure", fileUploadMiddleware.brouchureUpload, catchError, courseController.uploadfile)
    .post("/details", courseValidation.courseDetails, catchError, courseController.addCourseDetails)
    .put("/details/:courseId", courseValidation.courseDetails, catchError, courseController.addCourseDetails)
    .post("/trailer-video", fileUploadMiddleware.videoUpload, catchError, courseController.uploadfile)
    .put("/additional-details/:courseId", courseValidation.AdditionalDetails, catchError, courseController.addAdditionalDetails)
    .get("/instructors", courseController.getIntructorList)

export default router;
