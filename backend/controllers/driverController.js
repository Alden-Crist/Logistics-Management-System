const Driver = require('./../models/driverModel');

exports.getAllDrivers = async (req, res) => {
    try {
      console.log('Received request for all drivers'); // Log the request
      const drivers = await Driver.findAll();
      console.log('Fetched drivers:', drivers); // Log the fetched data
      res.status(200).json(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
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


exports.deleteDriver = async (req, res) => {
    try {
        // Find the driver first
        const driver = await Driver.findByPk(req.params.id);

        if (!driver) {
            return res.status(404).json({ status: 'fail', message: 'Driver not found' });
        }

        // Delete the driver
        await driver.destroy();

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