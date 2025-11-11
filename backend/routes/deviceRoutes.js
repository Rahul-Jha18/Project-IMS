const express = require('express');
const {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice
} = require('../controllers/deviceController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const router = express.Router();

// GET all devices
router.get('/', protect, getDevices);

// CREATE new device
router.post('/', protect, adminOnly, createDevice);

// UPDATE device by ID
router.put('/:id', protect, adminOnly, updateDevice);

// DELETE device by ID
router.delete('/:id', protect, adminOnly, deleteDevice);

module.exports = router;
