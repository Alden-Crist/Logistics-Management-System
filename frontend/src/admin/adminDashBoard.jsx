import React, { useEffect, useState } from 'react';
import './AdminDashBoard.css';

const AdminDashboard = () => {
    const [adminName, setAdminName] = useState('');
    const adminId = localStorage.getItem('adminId');
   
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

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {adminName}!</h1>
            </header>
            <main className="dashboard-main">
                <p className="dashboard-info">This is your admin dashboard. From here, you can manage all aspects of the application.</p>
                {/* Add more content or functionality here */}
            </main>
            <footer className="dashboard-footer">
                <p>&copy; 2024 Your Company Name</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;
