import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        // Fetch the warehouse data from the API
        axios.get('http://localhost:3000/api/v1/warehouses')
            .then(response => {
                setWarehouses(response.data);
            })
            .catch(error => {
                console.error('Error fetching the warehouse data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Warehouses</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Created At</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Warehouse;
