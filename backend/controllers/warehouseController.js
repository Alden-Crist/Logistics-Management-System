const Warehouse = require('./../models/warehouseModel');


exports.getAllWarehouses= async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();
        console.log(warehouses)
        res.status(200).json(warehouses);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'An error occurred while fetching warehouses.' });
    }
};


exports.createWarehouse = async (req, res) => {
    try {
        const { name, location, capacity } = req.body;
        const newWarehouse = await Warehouse.create({ name, location, capacity });
        res.status(201).json(newWarehouse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create warehouse' });
    }
};