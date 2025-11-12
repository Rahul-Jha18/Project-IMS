// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_admin' },
}, {
  timestamps: true,
  underscored: true,
});

// ✅ Compare plaintext password to hashed password
User.prototype.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

// ✅ Hash password *only if not already hashed*
User.addHook('beforeCreate', async (user) => {
  if (user.password && !user.password.startsWith('$2a$')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.addHook('beforeUpdate', async (user) => {
  if (user.changed('password') && !user.password.startsWith('$2a$')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
