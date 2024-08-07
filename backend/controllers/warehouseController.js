const Warehouse = require('./../models/warehouseModel');


exports.getAllWarehouses= async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();
       
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

exports.deleteWarehouse = async (req, res) => {
    try {
        // Find the driver first
        const warehouse = await Warehouse.findByPk(req.params.id);

        if (!warehouse) {
            return res.status(404).json({ status: 'fail', message: 'Warehouse not found' });
        }

        // Delete the driver
        await warehouse.destroy();

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