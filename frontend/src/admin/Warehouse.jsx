import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({
        name: '',
        location: '',
        capacity: ''
    });

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/warehouses`)
            .then(response => {
                setWarehouses(response.data);
            })
            .catch(error => {
                console.error('Error fetching the warehouse data:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWarehouse({ ...newWarehouse, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const warehouseData = {
            ...newWarehouse,
            created_at: new Date().toISOString()
        };
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/warehouses`, warehouseData)
            .then(response => {
                setWarehouses([...warehouses, response.data]);
                setShowForm(false);
                setNewWarehouse({
                    name: '',
                    location: '',
                    capacity: ''
                });
            })
            .catch(error => {
                console.error('Error adding the warehouse:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/warehouses/${id}`)
            .then(() => {
                setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
            })
            .catch(error => {
                console.error('Error deleting the warehouse:', error);
            });
    };

    return (
        <div>
            <h1>Warehouses</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Warehouse'}
            </button>
            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newWarehouse.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={newWarehouse.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={newWarehouse.capacity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Warehouse</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map(warehouse => (
                        <tr key={warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.location}</td>
                            <td>{warehouse.capacity}</td>
                            <td>{new Date(warehouse.created_at).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleDelete(warehouse.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Warehouse;
