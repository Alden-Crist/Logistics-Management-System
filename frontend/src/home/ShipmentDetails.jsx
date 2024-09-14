import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
//import './ShipmentDetails.css'; 

const ShipmentDetails = () => {
  const location = useLocation();
  const { trackingNumber } = location.state; // Get the tracking number from state
  const [shipment, setShipment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/shipments`, {
          params: { tracking_number: trackingNumber }
        });
        
        if (response.data && response.data.length > 0) {
          setShipment(response.data[0]);
        } else {
          setErrorMessage('Shipment not found.');
        }
      } catch (error) {
        console.error('Error fetching shipment data:', error);
        setErrorMessage('Error retrieving shipment details.');
      }
    };

    fetchShipmentDetails();
  }, [trackingNumber]);

  return (
    <div className="shipment-details-page">
      <header id="header">
        <nav className="navbar">
          <NavLink to="/" className="nav-link">Home</NavLink>
        </nav>
      </header>
      
      <div className="shipment-container">
        <h2>Shipment Details</h2>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : shipment ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Shipment Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{shipment.order_id}</td>
                <td>{new Date(shipment.shipment_date).toLocaleDateString()}</td>
                <td>{new Date(shipment.delivery_date).toLocaleDateString()}</td>
                <td>{shipment.status}</td>
                <td>${shipment.Order.total_amount}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading shipment details...</p>
        )}
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 Logistics Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ShipmentDetails;
