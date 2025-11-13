const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Branch = require('./Branch');
const Device = require('./Device');

const Request = sequelize.define(
  'Request',
  {
    id: {
      type: DataTypes.INTEGER,      // matches DB: INT
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,      // matches DB: INT
      allowNull: false,
      field: 'user_id',             // maps to column user_id
    },

    type: {
      type: DataTypes.STRING,       // matches DB: VARCHAR(255)
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,         // matches DB: TEXT
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM('Pending', 'Done'), // matches DB ENUM
      allowNull: false,
      defaultValue: 'Pending',
    },

    branchId: {
      type: DataTypes.INTEGER,      // matches DB: INT
      allowNull: true,
      field: 'branch_id',
    },

    deviceId: {
      type: DataTypes.INTEGER,      // matches DB: INT
      allowNull: true,
      field: 'device_id',
    },
  },
  {
    tableName: 'requests',          // EXACT DB table name
    timestamps: true,               // enables created_at + updated_at
    underscored: true,              // maps camelCase → snake_case
  }
);

/* ================================
   🔗 ASSOCIATIONS (RELATIONSHIPS)
================================ */

Request.belongsTo(User,   { foreignKey: 'user_id',   as: 'user' });
Request.belongsTo(Branch, { foreignKey: 'branch_id', as: 'branch' });
Request.belongsTo(Device, { foreignKey: 'device_id', as: 'device' });

User.hasMany(Request,   { foreignKey: 'user_id',   as: 'requests' });
Branch.hasMany(Request, { foreignKey: 'branch_id', as: 'requests' });
Device.hasMany(Request, { foreignKey: 'device_id', as: 'requests' });

module.exports = Request;
