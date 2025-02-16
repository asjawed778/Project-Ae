
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as courseController from "../category/category.controller";
import * as courseValidation from "./course.validation";
const router = Router();

router
    .post('/category', authMiddlerware.auth, courseValidation.createCourseCategory, catchError, )
        
export default router;
