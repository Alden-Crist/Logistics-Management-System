import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashBoard.css';

const AdminDashboard = () => {
    const [adminName, setAdminName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const adminId = localStorage.getItem('adminId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/admins/${adminId}`);
                if (response.ok) {
                    const data = await response.json();
                    setAdminName(data.data.admin.name);
                } else {
                    console.error('Failed to fetch admin name');
                }
            } catch (error) {
                console.error('Error fetching admin name:', error);
            }
        };

        if (adminId) {
            fetchAdminName();
        }
    }, [adminId]);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.toLowerCase();
        if (query === 'drivers' || query === 'Drivers') {
            navigate('/Driver');
        } else if (query === 'transportlogs' || query === 'Transportlogs') {
            navigate('/TransportLog');
        } else if (query === 'suppliers' || query === 'Suppliers') {
            navigate('/SupplierRecord');
        }else if (query === 'inventory' || query === 'Inventory') {
            navigate('/Inventory');
        }else if (query === 'shipment' || query === 'Shipment') {
            navigate('/Shipment');
        }else if (query === 'warehouse '  || query === 'Warehouse') {
            navigate('/Warehouse');
        }  else if (query === 'vehicles' || query === 'fleets') {
            navigate('/VehicleRecord');
        } else if (query === 'customer' || query === 'customers') {
            navigate('/CustomerRecord');
        } else if (query === 'product' || query === 'products'|| query === 'Products') {
            navigate('/ProductRecord');
        } else if (query === 'orderitems' || query === 'Orderitems') {
            navigate('/OrderItemsRecord');
        } else if (query === 'orders' || query === 'Orders') {
            navigate('/OrderRecord');
        } 
        
    };

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {adminName}!</h1>
            </header>
            <main className="dashboard-main">
                <p className="dashboard-info">This is ok the admin dashboard. This is where admins can add drivers, check warehouses, manage inventory, and notify suppliers about low stock items. You also handle the delivery of products to customers, handling here refers to the assign the driver and the vechile which is availiable on that route</p>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </main>
            <footer className="dashboard-footer">
                <p>&copy; 2024 Company All Rights Reserved....</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;
