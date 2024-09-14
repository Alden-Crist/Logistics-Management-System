const {  DataTypes } = require('sequelize');
const sequelize = require('./../config/db');

const Customer = require('./customerModel');

const Order = sequelize.define('Order', {
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'customers',
            key: 'id'
        },
        
    },
    order_date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'orders',
    timestamps: false
});

Order.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = Order;
