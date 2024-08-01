const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');
const Product = require('./productModel')
const Warehouse = require('./warehouseModel');

const Inventory = sequelize.define('Inventory', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    warehouse_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'warehouses',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'inventory',
    timestamps: false
});

Inventory.belongsTo(Product, { foreignKey: 'product_id' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });

module.exports = Inventory;
