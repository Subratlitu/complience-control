const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const controlRoutes = require('./control.routes');
const taskRoutes = require('./task.routes');
const auditRoutes = require('./audit.routes');

// All API routes mounted under /api/*
router.use('/auth', authRoutes);
router.use('/control', controlRoutes);
router.use('/task', taskRoutes);
router.use('/audit', auditRoutes);

module.exports = router;
