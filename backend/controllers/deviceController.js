// controllers/deviceController.js
const asyncHandler = require('express-async-handler');
const Device = require('../models/Device');
const Branch = require('../models/Branch');

// GET /api/devices?branchId=1
exports.getDevices = asyncHandler(async (req, res) => {
  const { branchId } = req.query;
  const whereClause = branchId ? { branchId } : {};

  const devices = await Device.findAll({
    where: whereClause,
    include: {
      model: Branch,
      as: 'branch',
      attributes: ['id', 'name'],
    },
  });

  res.json(devices);
});

// POST /api/devices
exports.createDevice = asyncHandler(async (req, res) => {
  const { name, ip, model, branchId, status } = req.body;

  if (!name || !ip || !model || !branchId) {
    res.status(400); throw new Error('All fields are required');
  }

  const device = await Device.create({ name, ip, model, branchId, status });
  const deviceWithBranch = await Device.findByPk(device.id, {
    include: { model: Branch, as: 'branch', attributes: ['id', 'name'] },
  });

  res.status(201).json(deviceWithBranch);
});

// UPDATE DEVICE
exports.updateDevice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, ip, model, status, branchId } = req.body;

  const device = await Device.findByPk(id);
  if (!device) {
    res.status(404);
    throw new Error('Device not found');
  }

  // Update fields if provided
  device.name = name || device.name;
  device.ip = ip || device.ip;
  device.model = model || device.model;
  device.status = status || device.status;
  device.branchId = branchId || device.branchId;

  await device.save();

  const updated = await Device.findByPk(id, {
    include: { model: Branch, as: 'branch', attributes: ['id', 'name'] },
  });

  res.json(updated);
});

// DELETE DEVICE
exports.deleteDevice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const device = await Device.findByPk(id);

  if (!device) {
    res.status(404);
    throw new Error('Device not found');
  }

  await device.destroy();
  res.json({ message: 'Device deleted successfully' });
});
  