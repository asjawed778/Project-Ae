import express from "express";
import userRoutes from "./user/user.route";
import courseCategoryRoutes from "./category/category.route";

// routes
const router = express.Router();

router.use("/user", userRoutes);
router.use("/course/category", courseCategoryRoutes);


export default router;