import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Customer.css'; 

const Customer = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/customers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                localStorage.setItem('customerId', data.customerId); // Store customer ID in local storage
                navigate('/CustomerDashBoard'); 
            } else {
                const data = await response.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Server error');
        }
    };

    const handleSignUp = () => {
        navigate('/CustomerSignUp'); 
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Customer Login</h2>
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
                        placeholder="Enter your name (e.g., Alice Smith)"
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
                        placeholder="Enter your password (e.g., 1234565)"
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <button onClick={handleSignUp} className="signup-button">Sign Up</button>
        </div>
    );
};

export default Customer;
