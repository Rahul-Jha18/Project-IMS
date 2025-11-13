  const asyncHandler = require('express-async-handler');
  const Branch = require('../models/Branch');

  // ========================
  // GET /api/branches
  // ========================
  exports.getBranches = asyncHandler(async (req, res) => {
    const branches = await Branch.findAll({ order: [['id', 'ASC']] });
    res.json(branches);
  });

  // ========================
  // POST /api/branches
  // ========================
  exports.createBranch = asyncHandler(async (req, res) => {
    const { name, manager_name, address, contact } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Branch name is required');
    }

    const exists = await Branch.findOne({ where: { name } });
    if (exists) {
      res.status(400);
      throw new Error('Branch already exists');
    }

    const branch = await Branch.create({
      name,
      manager_name,
      address,
      contact,
    });

    res.status(201).json(branch);
  });

  // ========================
  // PUT /api/branches/:id
  // ========================
  exports.updateBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, manager_name, address, contact } = req.body;

    const branch = await Branch.findByPk(id);
    if (!branch) {
      res.status(404);
      throw new Error('Branch not found');
    }

    branch.name = name || branch.name;
    branch.manager_name = manager_name || branch.manager_name;
    branch.address = address || branch.address;
    branch.contact = contact || branch.contact;

    await branch.save();
    res.json(branch);
  });

  // ========================
  // DELETE /api/branches/:id
  // ========================
  exports.deleteBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const branch = await Branch.findByPk(id);
    if (!branch) {
      res.status(404);
      throw new Error('Branch not found');
    }

    await branch.destroy();
    res.json({ message: 'Branch deleted successfully' });
  });
