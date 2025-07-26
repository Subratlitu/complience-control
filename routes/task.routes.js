const express = require('express');
const router = express.Router();
const {
    assignTask,
    completeTask,
    getTasks
} = require('../controllers/task.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

// Admin assigns task
router.post('/create', verifyToken, allowRoles('Admin'), assignTask);

// Employee completes task
router.patch('/:taskId', verifyToken, allowRoles('Employee'), completeTask);

// All roles view (with filtering inside controller)
router.get('/get', verifyToken, allowRoles('Admin', 'Auditor', 'Employee'), getTasks);

module.exports = router;
