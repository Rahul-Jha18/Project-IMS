const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Generate JWT

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // include role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};


// @desc Register new user
// @route POST /api/auth/register

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields.');
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role: role || 'user', // default to 'user'
  });

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: generateToken(newUser),
  });
});


// @desc Login user
// @route POST /api/auth/login

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// @desc Get profile
// @route GET /api/auth/profile

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'role', 'createdAt'],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
