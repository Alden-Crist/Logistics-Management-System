const TransportLog = require('./../models/transportLogModel');
const Shipment = require('./../models/shipmentModel');
const Fleet = require('./../models/fleetModel');
const Driver = require('./../models/driverModel');

exports.getAllTransportLogs =async (req, res) => {
    try {
        const transportLogs = await TransportLog.findAll({
            include: [
                { model: Shipment },
                { model: Fleet },
                { model: Driver }
            ]
        });
        res.status(200).json(transportLogs);
    } catch (error) {
        console.error('Error fetching transport logs:', error);
        res.status(500).json({ error: 'Failed to fetch transport logs' });
    }
};

exports.createTransportLog= async (req, res) => {
    try {
        const { shipment_id, vehicle_id, driver_id, start_time, end_time } = req.body;
        const newTransportLog = await TransportLog.create({
            shipment_id,
            vehicle_id,
            driver_id,
            start_time,
            end_time
        });
        res.status(201).json(newTransportLog);
    } catch (error) {
        console.error('Error creating transport log:', error);
        res.status(500).json({ error: 'Failed to create transport log' });
    }
};