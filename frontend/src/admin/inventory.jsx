import React, { useEffect, useState } from 'react';
import './Inventory.css';

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/inventory`);
                if (response.ok) {
                    const data = await response.json();
                    setInventoryData(data);
                } else {
                    console.error('Failed to fetch inventory data');
                }
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventory();
    }, []);

    const handleViewDetails = (item) => {
        if (selectedItem && selectedItem.id === item.id) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    return (
        <div className="inventory-container">
            <h1>Inventory Records</h1>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Warehouse ID</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.product_id}</td>
                            <td>{item.warehouse_id}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => handleViewDetails(item)}>
                                    {selectedItem && selectedItem.id === item.id ? 'Less Details' : 'View Details'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedItem && (
                <div className="details-container">
                    <h2>Product Details</h2>
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedItem.Product.id}</td>
                                <td>{selectedItem.Product.name}</td>
                                <td>{selectedItem.Product.description}</td>
                                <td>{selectedItem.Product.price}</td>
                                <td>{selectedItem.Product.stock_quantity}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Warehouse Details</h2>
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedItem.Warehouse.id}</td>
                                <td>{selectedItem.Warehouse.name}</td>
                                <td>{selectedItem.Warehouse.location}</td>
                                <td>{selectedItem.Warehouse.capacity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Inventory;
