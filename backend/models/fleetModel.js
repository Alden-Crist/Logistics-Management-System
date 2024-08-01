const {  DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Fleet = sequelize.define('Fleet', {
    vehicle_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_type: {
        type: DataTypes.STRING
    },
    capacity: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'fleet',
    timestamps: false
});

module.exports = Fleet;
