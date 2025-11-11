const express = require('express');
const {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../controllers/branchContoller');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/', protect, getBranches);
router.post('/', protect, adminOnly, createBranch);
router.put('/:id', protect, adminOnly, updateBranch);
router.delete('/:id', protect, adminOnly, deleteBranch);

module.exports = router;
