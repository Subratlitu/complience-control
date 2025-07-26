const express = require('express');
const router = express.Router();
const { createControl, editControl } = require('../controllers/control.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

// Only Admin can create or edit controls
router.post('/create', verifyToken, allowRoles('Admin'), createControl);
router.patch('/edit/:controlId', verifyToken, allowRoles('Admin'), editControl);

module.exports = router;
