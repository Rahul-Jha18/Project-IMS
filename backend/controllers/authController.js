const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ========================
// REGISTER USER
// ========================
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, is_admin = 0 } = req.body || {};

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Sequelize model uses "isAdmin" property, not "is_admin"
  const user = await User.create({
    name,
    email,
    password,
    isAdmin: is_admin,
  });

  console.log('\n✅ New user registered:', user.email);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.isAdmin ? 1 : 0,
    token: generateToken(user.id),
  });
});


// ========================
// LOGIN USER
// ========================
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ where: { email } });

  console.log('\n=== LOGIN DEBUG ===');
  console.log('Email entered:', email);
  console.log('User from DB:', user ? user.toJSON() : '❌ User not found');

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password (user not found)');
  }

  const isMatch = await user.matchPassword(password);
  console.log('Password entered (plaintext):', password);
  console.log('Stored password hash:', user.password);
  console.log('Password match result:', isMatch);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password (password mismatch)');
  }

  console.log('✅ Login successful for:', user.email);

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.isAdmin ? 1 : 0,
    token: generateToken(user.id),
  });
});
