const {  DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Shipment = require('./shipmentModel');
const Fleet = require('./fleetModel');
const Driver = require('./driverModel');

const TransportLog = sequelize.define('TransportLog', {
    shipment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'shipments',
            key: 'id'
        }
    },
    vehicle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'fleet',
            key: 'id'
        }
    },
    driver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'drivers',
            key: 'id'
        }
    },
    start_time: {
        type: DataTypes.DATE
    },
    end_time: {
        type: DataTypes.DATE
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'transport_logs',
    timestamps: false
});

TransportLog.belongsTo(Shipment, { foreignKey: 'shipment_id' });
TransportLog.belongsTo(Fleet, { foreignKey: 'vehicle_id' });
TransportLog.belongsTo(Driver, { foreignKey: 'driver_id' });

module.exports = TransportLog;
