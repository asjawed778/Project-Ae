const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { isAuthorized } = require('../middlewares/authorize');
const { addCourse } = require('../controllers/course/addCourse');
const { addCategory, getAllCategory, editCategory } = require('../controllers/course/category');
const { getCourseByCategory, getFullCourseDetails, getAllCourse } = require('../controllers/course/getCourse');



router.post('/course/add-category', auth, isAuthorized, addCategory);
router.get('/course/get-all-category', getAllCategory);
router.put('/course/edit-category/:categoryId', auth, isAuthorized, editCategory);


router.post('/course/add-course',auth, isAuthorized, addCourse);
router.get('/course/get-category-course/:categoryId', getCourseByCategory);
router.get('/course/get-full-course-details/:courseId', getFullCourseDetails);
router.get('/course/get-all-course', getAllCourse);


module.exports = router;