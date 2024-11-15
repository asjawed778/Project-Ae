const express = require('express');
const router = express.Router();
const { addCourse } = require('../controllers/course/addCourse');
const { addCategory, getAllCategory } = require('../controllers/course/category');


router.post('/course/add-course', addCourse);

router.post('/course/add-category', addCategory);
router.get('/course/get-all-category', getAllCategory);


module.exports = router;