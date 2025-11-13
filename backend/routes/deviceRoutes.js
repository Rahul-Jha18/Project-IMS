// backend/routes/deviceRoutes.js
const express = require('express');
const router = express.Router();

const {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} = require('../controllers/deviceController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// ✅ All logged-in users can VIEW devices
router.get('/', protect, getDevices);

// ✅ Only admin can CREATE/UPDATE/DELETE devices
router.post('/', protect, adminOnly, createDevice);
router.put('/:id', protect, adminOnly, updateDevice);
router.delete('/:id', protect, adminOnly, deleteDevice);

module.exports = router;
