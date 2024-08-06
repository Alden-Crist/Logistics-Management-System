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
        if (query === 'drivers') {
            navigate('/Driver');
        } else if (query === 'transportlogs') {
            navigate('/TransportLog');
        } else if (query === 'suppliers') {
            navigate('/SupplierRecord');
        }else if (query === 'inventory') {
            navigate('/Inventory');
        }else if (query === 'shipment') {
            navigate('/Shipment');
        }else if (query === 'warehouse') {
            navigate('/Warehouse');
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
                <p className="dashboard-info">This is your admin dashboard. This is where you can add drivers, check warehouses, manage inventory, and notify suppliers about low stock items. You also handle the delivery of products to customers.</p>
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
                <p>&copy; 2024 Company</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;
