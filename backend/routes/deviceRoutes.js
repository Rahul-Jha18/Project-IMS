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
const { adminOrSubadmin, adminOnlyDelete } = require('../middleware/adminMiddleware');

// All logged-in users can VIEW devices
router.get('/', protect, getDevices);

//  Admin + Subadmin can create and update
router.post('/', protect, adminOrSubadmin, createDevice);
router.put('/:id', protect, adminOrSubadmin, updateDevice);

//  ONLY Admin can delete
router.delete('/:id', protect, adminOnlyDelete, deleteDevice);

module.exports = router;
