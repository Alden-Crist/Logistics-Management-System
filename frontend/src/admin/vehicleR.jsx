import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleRecord = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vehicle_number: '',
    vehicle_type: '',
    capacity: '',
    status: 'Available',
    created_at: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/fleets');
        setVehicles(response.data);
      } catch (error) {
        console.error('There was an error fetching the vehicles!', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add today's date to the new vehicle data
    const vehicleWithDate = {
      ...newVehicle,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/fleets', vehicleWithDate);
      
      setVehicles([...vehicles, response.data]); // Update state with the response data

      // Reset the form
      setNewVehicle({
        vehicle_number: '',
        vehicle_type: '',
        capacity: '',
        status: 'Available',
        created_at: '',
      });

      setShowForm(false);
    } catch (error) {
      console.error('There was an error adding the vehicle!', error);
    }
  };

  return (
    <div>
      <h1>Vehicle Records</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input
            type="text"
            name="vehicle_number"
            placeholder="Vehicle Number"
            value={newVehicle.vehicle_number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="vehicle_type"
            placeholder="Vehicle Type"
            value={newVehicle.vehicle_type}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={newVehicle.capacity}
            onChange={handleInputChange}
            required
          />
          <select
            name="status"
            value={newVehicle.status}
            onChange={handleInputChange}
            required
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      )}

      <table style={{ marginTop: '20px' }}>
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
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
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
