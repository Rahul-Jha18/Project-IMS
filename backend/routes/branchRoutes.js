const express = require('express');
const {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../controllers/branchController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', protect, getBranches);

// Admin and Sub-Admin can create or update
router.post('/', protect, allowRoles('admin', 'sub-admin'), createBranch);
router.put('/:id', protect, allowRoles('admin', 'sub-admin'), updateBranch);

// Only Admin can delete
router.delete('/:id', protect, allowRoles('admin'), deleteBranch);

module.exports = router;
