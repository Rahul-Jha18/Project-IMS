const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
      if (!user) { res.status(401); throw new Error('Not authorized'); }
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