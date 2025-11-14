// backend/routes/branchRoutes.js
const express = require('express');
const router = express.Router();

const {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} = require('../controllers/branchController');

const { protect } = require('../middleware/authMiddleware');
const { adminOrSubadmin, adminOnlyDelete } = require('../middleware/adminMiddleware');

// ✅ everyone logged in can view
router.get('/', protect, getBranches);

// ✅ admin + subadmin can add / edit
router.post('/', protect, adminOrSubadmin, createBranch);
router.put('/:id', protect, adminOrSubadmin, updateBranch);

// ✅ only admin can delete
router.delete('/:id', protect, adminOnlyDelete, deleteBranch);

module.exports = router;
