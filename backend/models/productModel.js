const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');
const Supplier = require('./supplierModel');


const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'suppliers',
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'products',
    timestamps: false
});

Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = Product;
