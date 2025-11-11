// middleware/adminMiddleware.js
exports.adminOnly = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.is_admin)) {
    next();
  } else {
    res.status(403);
    throw new Error('Admin access required');
  }
};