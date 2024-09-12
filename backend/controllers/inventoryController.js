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


exports.updateInventory = async (req, res) => {
    try {
        const { id } = req.params; // Inventory record ID
        const { quantity } = req.body; // The new quantity to be updated

        // Find the inventory record by ID
        const inventory = await Inventory.findByPk(id);

        if (!inventory) {
            return res.status(404).json({ error: 'Inventory record not found' });
        }

        // Update the inventory's quantity
        inventory.quantity = quantity;
        await inventory.save();

        res.status(200).json({ message: 'Inventory quantity updated successfully', inventory });
    } catch (error) {
        console.error('Error updating inventory quantity:', error);
        res.status(500).json({ error: 'Failed to update inventory quantity' });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        // Find the driver first
        const inventory = await Inventory.findByPk(req.params.id);

        if (!inventory) {
            return res.status(404).json({ status: 'fail', message: 'Driver not found' });
        }

        // Delete the driver
        await inventory.destroy();

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};
