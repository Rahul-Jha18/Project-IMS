const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

exports.getEmployees = asyncHandler(async (req, res) => {
  const where = {};
  if (req.query.branch) where.branch = req.query.branch;
  const employees = await Employee.findAll({ where, order: [['createdAt', 'DESC']] });
  res.json(employees);
});

exports.getEmployeeById = asyncHandler(async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) { res.status(404); throw new Error('Employee not found'); }
  res.json(emp);
});

exports.createEmployee = asyncHandler(async (req, res) => {
  const { name, email, position, department, phone, salary, branch } = req.body;
  if (!name) { res.status(400); throw new Error('Name is required'); }
  const created = await Employee.create({
    name, email, position, department, phone, salary, branch, createdBy: req.user.id
  });
  res.status(201).json(created);
});

exports.updateEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) { res.status(404); throw new Error('Employee not found'); }
  if (!req.user.isAdmin && emp.createdBy !== req.user.id) { res.status(403); throw new Error('Forbidden'); }
  await emp.update(req.body);
  res.json(emp);
});

exports.deleteEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) { res.status(404); throw new Error('Employee not found'); }
  if (!req.user.isAdmin && emp.createdBy !== req.user.id) { res.status(403); throw new Error('Forbidden'); }
  await emp.destroy();
  res.json({ message: 'Employee removed' });
});