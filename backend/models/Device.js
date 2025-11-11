// models/Device.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Branch = require('./Branch');

const Device = sequelize.define('Device', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  ip: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
}, {
  timestamps: true,
  tableName: 'devices',
});

// Associations
Device.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
Branch.hasMany(Device, { foreignKey: 'branchId', as: 'devices' });

module.exports = Device;