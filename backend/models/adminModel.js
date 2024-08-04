const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Admin = sequelize.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'admins',
  timestamps: false,
});

module.exports = Admin;
