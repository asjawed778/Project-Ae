const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { isAuthorized } = require('../middlewares/authorize');
const { getAllPermissions, modifyPermissions, getAllRoles } = require('../controllers/superAdmin/permissions');



router.get('/admin/get-all-permission', auth, isAuthorized, getAllPermissions);
router.put('/admin/modify-permission', auth, isAuthorized, modifyPermissions);
router.get('/admin/get-all-roles', auth, isAuthorized, getAllRoles);


module.exports = router;