// backend/controllers/requestController.js
const asyncHandler = require('express-async-handler');
const Request = require('../models/Request');
const User = require('../models/User');

// @desc Create a new request (User)
exports.createRequest = asyncHandler(async (req, res) => {
  const { type, description } = req.body;

  if (!type || !description) {
    res.status(400);
    throw new Error('Type and description are required');
  }

  const newRequest = await Request.create({
    userId: req.user.id,
    type,
    description,
  });

  res.status(201).json(newRequest);
});

// @desc Get all requests for a specific user
exports.getUserRequests = asyncHandler(async (req, res) => {
  const requests = await Request.findAll({
    where: { userId: req.user.id },
    order: [['createdAt', 'DESC']],
  });
  res.json(requests);
});

// @desc Get all requests (Admin)
exports.getAllRequests = asyncHandler(async (req, res) => {
  const requests = await Request.findAll({
    include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    order: [['createdAt', 'DESC']],
  });
  res.json(requests);
});

// @desc Update request status (Admin)
exports.updateRequestStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Done'];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const request = await Request.findByPk(id);
  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  request.status = status;
  await request.save();

  res.json({ message: 'Status updated', request });
});
