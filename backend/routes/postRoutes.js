const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { createPost } = require('../controllers/userPost/createPost');

router.post('/create-post', auth, createPost);


module.exports = router;