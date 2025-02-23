
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "./course.controller";
import * as courseValidation from "./course.validation";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
    .post("/upload", fileUploadMiddleware.brouchureUpload, catchError, courseController.uploadfile)
    .post("/details", courseValidation.courseDetails, courseController.addCourseDetails)

export default router;
