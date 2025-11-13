// backend/middleware/adminMiddleware.js

// Simple admin-only check
exports.adminOnly = (req, res, next) => {
  if (req.user && (req.user.is_admin || req.user.role === 'admin')) {
    return next();
  }
  res.status(403);
  throw new Error('Admin access required');
};

// Role-based middleware (optional helper)
exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};  
