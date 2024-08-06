import React, { useEffect, useState } from 'react';
import './Driver.css';

const Driver = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/drivers');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched drivers data:', data); // Log the fetched data
                    // Assuming the data structure you provided directly
                    if (Array.isArray(data)) {
                        setDrivers(data);
                    }  else {
                        console.error('Unexpected response structure:', data);
                    }
                } else {
                    console.error('Failed to fetch drivers');
                }
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    return (
        <div className="driver-container">
            <header className="driver-header">
                <h1>Driver List</h1>
            </header>
            <main className="driver-main">
                <table className="driver-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>License Number</th>
                            <th>Phone</th>
                            <th>Assigned Vehicle ID</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td>{driver.name}</td>
                                <td>{driver.license_number}</td>
                                <td>{driver.phone}</td>
                                <td>{driver.assigned_vehicle_id}</td>
                                <td>{new Date(driver.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Driver;
