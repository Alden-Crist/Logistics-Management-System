const Driver = require('./../models/driverModel');

exports.getAllDrivers =async (req, res) => {
    try {
        const drivers = await Driver.findAll();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createDriver =async (req, res) => {
    try {
        const { name, license_number, phone, assigned_vehicle_id } = req.body;
        const newDriver = await Driver.create({
            name,
            license_number,
            phone,
            assigned_vehicle_id,
            created_at: new Date()
        });
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};