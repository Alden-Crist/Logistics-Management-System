const sequelize = require('./../config/db');


const Customer = require('./customerModel')
const Supplier = require('./supplierModel')
const Product = require('./productModel')
const Order = require('./orderModel')
const OrderItem = require('./orderItemModel')
const Shipment = require('./shipmentModel')
const Warehouse = require('./warehouseModel')
const Inventory = require('./inventoryModel')
const Fleet = require('./fleetModel')
const Driver = require('./driverModel')
const TransportLog = require('./transportLogModel')

// Define relationships


// Export models
module.exports = {
    sequelize,
    Customer,
    Supplier,
    Product,
    Order,
    OrderItem,
    Shipment,
    Warehouse,
    Inventory,
    Fleet,
    Driver,
    TransportLog
};