import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleRecord = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/fleets');
        setVehicles(response.data);
      } catch (error) {
        console.error("There was an error fetching the vehicles!", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Vehicle Records</h1>
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
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.vehicle_number}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.capacity}</td>
              <td>{vehicle.status}</td>
              <td>{new Date(vehicle.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleRecord;
