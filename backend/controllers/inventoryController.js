const Inventory = require('./../models/inventoryModel');
const Product = require('./../models/productModel');
const Warehouse = require('./../models/warehouseModel');


exports.getAllInventorys =async (req, res) => {
    try {
        const inventory = await Inventory.findAll({
            include: [{ model: Product }, { model: Warehouse }]
        });
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};

exports.createInventory=async (req, res) => {
    try {
        const { product_id, warehouse_id, quantity } = req.body;
        const newInventory = await Inventory.create({
            product_id,
            warehouse_id,
            quantity
        });
        res.status(201).json(newInventory);
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).json({ error: 'Failed to create inventory' });
    }
};