import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Supplier.css'; 

const Supplier = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/suppliers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                
                // Store the supplier ID in local storage
                localStorage.setItem('supplierId', data.supplierId);

                // Navigate to SupplierDashboard
                navigate('/SupplierDashboard');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Server error');
        }
    };

    const handleSignUp = () => {
        navigate('/SupplierSignUp'); 
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Supplier Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <button onClick={handleSignUp} className="signup-button">Sign Up</button>
        </div>
    );
};

export default Supplier;
