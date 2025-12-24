// backend/models/Branch.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Branch = sequelize.define('Branch', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  manager_name: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  contact: { type: DataTypes.STRING, allowNull: true },
  ext_no: { type: DataTypes.STRING, allowNull: true }, // NEW FIELD
}, {
  timestamps: true,
  tableName: 'branches',
});

module.exports = Branch;
