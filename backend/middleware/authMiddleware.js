const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ===============================
// PROTECT ROUTE (JWT Verification)
// ===============================
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        res.status(401);
        throw new Error('Not authorized');
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// ===============================
// ROLE-BASED ACCESS CONTROL
// ===============================
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied: Admins only');
  }
  next();
};

exports.subAdminOrAdmin = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'subadmin') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Admin or SubAdmin only');
  }
};

// Example use in route: block deletes for subadmins
exports.noDeleteForSubAdmin = (req, res, next) => {
  if (req.user.role === 'subadmin' && req.method === 'DELETE') {
    res.status(403);
    throw new Error('SubAdmin is not allowed to delete items');
  }
  next();
};
