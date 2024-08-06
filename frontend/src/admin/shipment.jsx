import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shipment = () => {
    const [shipments, setShipments] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        // Fetch the shipment data from the API
        axios.get('http://localhost:3000/api/v1/shipments')
            .then(response => {
                setShipments(response.data);
            })
            .catch(error => {
                console.error('Error fetching the shipment data:', error);
            });
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div>
            <h1>Shipments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Shipment ID</th>
                        <th>Order ID</th>
                        <th>Shipment Date</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                        <th>Tracking Number</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map(shipment => (
                        <tr key={shipment.id}>
                            <td>{shipment.id}</td>
                            <td>
                                <button onClick={() => handleOrderClick(shipment.Order)}>
                                    {shipment.order_id}
                                </button>
                            </td>
                            <td>{new Date(shipment.shipment_date).toLocaleString()}</td>
                            <td>{new Date(shipment.delivery_date).toLocaleString()}</td>
                            <td>{shipment.status}</td>
                            <td>{shipment.tracking_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div>
                    <h2>Order Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedOrder.id}</td>
                                <td>{selectedOrder.customer_id}</td>
                                <td>{new Date(selectedOrder.order_date).toLocaleString()}</td>
                                <td>{selectedOrder.status}</td>
                                <td>{selectedOrder.total_amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Shipment;
