const Fleet = require('./../models/fleetModel');


exports.getAllVehicles =async (req, res) => {
    try {
        const fleets = await Fleet.findAll();
        res.status(200).json(fleets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createFleet =async (req, res) => {
    try {
        const { vehicle_number, vehicle_type, capacity, status } = req.body;
        const newFleet = await Fleet.create({
            vehicle_number,
            vehicle_type,
            capacity,
            status,
            created_at: new Date()
        });
        res.status(201).json(newFleet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

