import React, { useEffect, useState } from 'react';
import './TransportLog.css';

const TransportLog = () => {
    const [transportLogs, setTransportLogs] = useState([]);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [selectedFleet, setSelectedFleet] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        const fetchTransportLogs = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/transportLogs`);
                const data = await response.json();
                setTransportLogs(data);
            } catch (error) {
                console.error('Error fetching transport logs:', error);
            }
        };

        fetchTransportLogs();
    }, []);

    const handleShipmentClick = (shipment) => {
        setSelectedShipment(shipment);
        setSelectedFleet(null);
        setSelectedDriver(null);
    };

    const handleFleetClick = (fleet) => {
        setSelectedFleet(fleet);
        setSelectedShipment(null);
        setSelectedDriver(null);
    };

    const handleDriverClick = (driver) => {
        setSelectedDriver(driver);
        setSelectedShipment(null);
        setSelectedFleet(null);
    };

    return (
        <div className="transport-log-container">
            <h1>Transport Logs</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Shipment ID</th>
                        <th>Vehicle ID</th>
                        <th>Driver ID</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transportLogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>
                                <button onClick={() => handleShipmentClick(log.Shipment)}>
                                    {log.shipment_id}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleFleetClick(log.Fleet)}>
                                    {log.vehicle_id}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDriverClick(log.Driver)}>
                                    {log.driver_id}
                                </button>
                            </td>
                            <td>{new Date(log.start_time).toLocaleString()}</td>
                            <td>{new Date(log.end_time).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedShipment && (
                <div className="details-container">
                    <h2>Shipment Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Order ID</th>
                                <th>Shipment Date</th>
                                <th>Delivery Date</th>
                                <th>Status</th>
                                <th>Tracking Number</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedShipment.id}</td>
                                <td>{selectedShipment.order_id}</td>
                                <td>{new Date(selectedShipment.shipment_date).toLocaleString()}</td>
                                <td>{new Date(selectedShipment.delivery_date).toLocaleString()}</td>
                                <td>{selectedShipment.status}</td>
                                <td>{selectedShipment.tracking_number}</td>
                                <td>{new Date(selectedShipment.created_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {selectedFleet && (
                <div className="details-container">
                    <h2>Fleet Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vehicle Number</th>
                                <th>Vehicle Type</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedFleet.id}</td>
                                <td>{selectedFleet.vehicle_number}</td>
                                <td>{selectedFleet.vehicle_type}</td>
                                <td>{selectedFleet.capacity}</td>
                                <td>{selectedFleet.status}</td>
                                <td>{new Date(selectedFleet.created_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {selectedDriver && (
                <div className="details-container">
                    <h2>Driver Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>License Number</th>
                                <th>Phone</th>
                                <th>Assigned Vehicle ID</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedDriver.id}</td>
                                <td>{selectedDriver.name}</td>
                                <td>{selectedDriver.license_number}</td>
                                <td>{selectedDriver.phone}</td>
                                <td>{selectedDriver.assigned_vehicle_id}</td>
                                <td>{new Date(selectedDriver.created_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransportLog;
