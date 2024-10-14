const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createPost } = require('../controllers/userPost/createPost');
const { deletePost } = require('../controllers/userPost/deletePost');
const { getAllPost } = require('../controllers/userPost/getAllPost');
const { getUserAllPost } = require('../controllers/userPost/getUserAllPost');
const { updatePost } = require('../controllers/userPost/updatePost');
const { likeUnlikePost } = require('../controllers/userPost/likeUnlikePost');
const { addComment } = require('../controllers/userPost/addComment');
const { editComment } = require('../controllers/userPost/editComment');
const { deleteComment } = require('../controllers/userPost/deleteComment');
const { getAllComments } = require('../controllers/userPost/getAllComments');

router.post('/create-post', auth, createPost);
router.get('/get-all-post', auth, getAllPost);
router.get('/get-user-all-post', auth, getUserAllPost);
router.delete('/delete-post/:postId', auth, deletePost);
router.put('/update-post/:postId', auth, updatePost);

router.post('/like-unlike-post/:postId', auth, likeUnlikePost);

router.post('/add-comment/:postId', auth, addComment);
router.put('/edit-comment/:postId/:commentId', auth, editComment);
router.delete('/delete-comment/:postId/:commentId', auth, deleteComment);
router.get('/get-comments/:postId', auth, getAllComments);


module.exports = router;