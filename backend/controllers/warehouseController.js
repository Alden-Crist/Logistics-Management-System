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



exports.getWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByPk(req.params.id);
        if (warehouse) {
          res.status(200).json(warehouse);
        } else {
          res.status(404).json({ error: 'Warehouse not found' });
        }
      } catch (err) {
        console.error('Error fetching warehouse:', err);
        res.status(500).json({ error: 'An error occurred while fetching warehouse.' });
      }
    }



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

exports.updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { capacity } = req.body; // Expecting 'capacity' from the request body

        // Find the warehouse by ID
        const warehouse = await Warehouse.findByPk(id);

        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }

        // Update the warehouse's capacity
        warehouse.capacity = capacity;
        await warehouse.save();

        res.status(200).json({ message: 'Warehouse capacity updated successfully', warehouse });
    } catch (error) {
        console.error('Error updating warehouse capacity:', error);
        res.status(500).json({ error: 'Failed to update warehouse capacity' });
    }
};


