const Shipment = require('./../models/shipmentModel');
const Order = require('./../models/orderModel');

exports.getAllShipments =  async (req, res) => {
    try {
        const shipments = await Shipment.findAll({
            include: [{ model: Order }]
        });
        res.status(200).json(shipments);
    } catch (error) {
        console.error('Error fetching shipments:', error);
        res.status(500).json({ error: 'Failed to fetch shipments' });
    }
};

exports.createShipment = async (req, res) => {
    try {
        const { order_id, shipment_date, delivery_date, status, tracking_number } = req.body;
        const newShipment = await Shipment.create({
            order_id,
            shipment_date,
            delivery_date,
            status,
            tracking_number
        });
        res.status(201).json(newShipment);
    } catch (error) {
        console.error('Error creating shipment:', error);
        res.status(500).json({ error: 'Failed to create shipment' });
    }
};

exports.deleteShipment = async (req, res) => {
    try {
        // Find the driver first
        const shipment = await Shipment.findByPk(req.params.id);

        if (!shipment) {
            return res.status(404).json({ status: 'fail', message: 'Shipment  not found' });
        }

        // Delete the driver
        await shipment.destroy();

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