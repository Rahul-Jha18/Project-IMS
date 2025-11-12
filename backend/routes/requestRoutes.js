// backend/routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// User routes
router.post('/', protect, createRequest);
router.get('/', protect, getUserRequests);

// Admin routes
router.get('/all', protect, adminOnly, getAllRequests);
router.put('/:id', protect, adminOnly, updateRequestStatus);

module.exports = router;
