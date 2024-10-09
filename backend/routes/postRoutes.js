const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createPost } = require('../controllers/userPost/createPost');
const { deletePost } = require('../controllers/userPost/deletePost');
const { getAllPost } = require('../controllers/userPost/getAllPost');
const { getUserAllPost } = require('../controllers/userPost/getUserAllPost');
const { updatePost } = require('../controllers/userPost/updatePost');

router.post('/create-post', auth, createPost);
router.get('/get-all-post', auth, getAllPost);
router.get('/get-user-all-post', auth, getUserAllPost)
router.delete('/delete-post/:postId', auth, deletePost);
router.put('/update-post/:postId', auth, updatePost);


module.exports = router;