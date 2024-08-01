const {  DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Warehouse = sequelize.define('Warehouse', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING
    },
    capacity: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'warehouses',
    timestamps: false
});

module.exports = Warehouse;
