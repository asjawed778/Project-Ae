const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createPost } = require('../controllers/userPost/createPost');
const { deletePost } = require('../controllers/userPost/deletePost');
const { getAllPost } = require('../controllers/userPost/getAllPost');
const { getUserAllPost } = require('../controllers/userPost/getUserAllPost');
const { updatePost } = require('../controllers/userPost/updatePost');
const {
    addComment,
    editComment,
    deleteComment,
    getComments,
    voteComment
} = require('../controllers/userPost/comment');
const { votePost } = require('../controllers/userPost/votePost');

const {
    replyToComment,
    editReply,
    deleteReply,
    voteReply
} = require('../controllers/userPost/replies');
 
// post routes 
router.post('/create-post', auth, createPost);
router.get('/get-all-post', auth, getAllPost);
router.get('/get-user-all-post', auth, getUserAllPost);
router.delete('/delete-post/:postId', auth, deletePost);
router.put('/update-post/:postId', auth, updatePost);

// voting on post routes
router.post('/vote-post/:postId', auth, votePost);


// comments routes 
router.post('/add-comment/:postId', auth, addComment);
router.put('/edit-comment/:postId/:commentId', auth, editComment);
router.delete('/delete-comment/:postId/:commentId', auth, deleteComment);
router.get('/get-comments/:postId', auth, getComments);
router.post('/vote-comment/:postId/:commentId', auth, voteComment);

// Reply routes
router.post('/reply-to-comment/:postId/:commentId', auth, replyToComment);
router.put('/edit-reply/:postId/:commentId/:replyId', auth, editReply);
router.delete('/delete-reply/:postId/:commentId/:replyId', auth, deleteReply);
router.post('/vote-reply/:postId/:commentId/:replyId', auth, voteReply);


module.exports = router;