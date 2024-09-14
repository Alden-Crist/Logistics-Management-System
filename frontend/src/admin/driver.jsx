import React, { useEffect, useState } from 'react';
import './Driver.css';

const Driver = () => {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({
        name: '',
        license_number: '',
        phone: '',
        assigned_vehicle_id: ''
    });

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/drivers`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched drivers data:', data); // Log the fetched data
                    if (Array.isArray(data)) {
                        setDrivers(data);
                    } else {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDriver(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddDriver = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/drivers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDriver)
            });
            if (response.ok) {
                const addedDriver = await response.json();
                setDrivers(prevDrivers => [...prevDrivers, addedDriver]);
                setNewDriver({ name: '', license_number: '', phone: '', assigned_vehicle_id: '' });
                document.getElementById('addDriverForm').style.display = 'none';
            } else {
                console.error('Failed to add driver');
            }
        } catch (error) {
            console.error('Error adding driver:', error);
        }
    };

    const showForm = () => {
        document.getElementById('addDriverForm').style.display = 'block';
    };

    const handleDeleteDriver = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/drivers/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== id));
            } else {
                console.error('Failed to delete driver');
            }
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    return (
        <div className="driver-container">
            <header className="driver-header">
                <h1>Driver List</h1>
            </header>
            <main className="driver-main">
                <button className="show-form-button" onClick={showForm}>Add Driver</button>
                <form id="addDriverForm" style={{ display: 'none' }} onSubmit={handleAddDriver}>
                    <h2>Add New Driver</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newDriver.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        License Number:
                        <input
                            type="text"
                            name="license_number"
                            value={newDriver.license_number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={newDriver.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Assigned Vehicle ID:
                        <input
                            type="number"
                            name="assigned_vehicle_id"
                            value={newDriver.assigned_vehicle_id}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <table className="driver-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>License Number</th>
                            <th>Phone</th>
                            <th>Assigned Vehicle ID</th>
                            <th>Created At</th>
                            <th>Action</th>
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
                                <td>
                                    <button onClick={() => handleDeleteDriver(driver.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Driver;
