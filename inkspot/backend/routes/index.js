const express = require('express');
const router = express.Router();
const searchRoutes = require('./search');

router.use('/search', searchRoutes);
router.use('/messages', messageRoutes);

// Add other routes here

module.exports = router;
