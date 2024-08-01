const {  DataTypes } = require('sequelize');
const sequelize = require('./../config/db');
const Order = require('./orderModel');


const Shipment = sequelize.define('Shipment', {
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    shipment_date: {
        type: DataTypes.DATE
    },
    delivery_date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    },
    tracking_number: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'shipments',
    timestamps: false
});

Shipment.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Shipment;
