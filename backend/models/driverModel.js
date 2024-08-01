const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');
const Fleet = require('./fleetModel')

const Driver = sequelize.define('Driver', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license_number: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    assigned_vehicle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'fleet',
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'drivers',
    timestamps: false
});

Driver.belongsTo(Fleet, { foreignKey: 'assigned_vehicle_id' });

module.exports = Driver;
