import React from 'react';
import './Home.css';
import logo from './logo.png'; 
import backgroundImage from './main-bg.jpg'; 
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header id="header">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Appvila Logo" className="logo-img" />
          </div>
          <ul className="nav-links">
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/Admin" className="nav-link">Admin</NavLink></li>
            <li><NavLink to="/Customer" className="nav-link">Customer</NavLink></li>
            <li><NavLink to="/Supplier" className="nav-link">Supplier</NavLink></li>
            <li><NavLink to="/" className="nav-link">Features</NavLink></li>
            <li><NavLink to="/" className="nav-link">Services</NavLink></li>
            <li><NavLink to="/" className="nav-link">Contact</NavLink></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="overlay">
          <div className="container">
            <h1 className="main-heading">Safe & Reliable Logistic Solutions!</h1>
            <p className="subheading">We ensure your goods are delivered on time, every time.</p>
            <div className="track-form">
              <input type="text" placeholder="Enter Your Tracking ID" className="track-input" />
              <button className="track-button">Track & Trace</button>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services">
            <div className="service">
              <h3>Freight Management</h3>
              <p>Comprehensive freight management solutions to move your cargo efficiently.</p>
            </div>
            <div className="service">
              <h3>Supply Chain Solutions</h3>
              <p>Optimize your supply chain with our innovative and scalable solutions.</p>
            </div>
            <div className="service">
              <h3>Order Tracking</h3>
              <p>Real-time tracking for your orders to keep you informed at all times.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 Logistics Management System. All rights reserved.</p>
          <ul className="footer-links">
            <li><NavLink to="/PrivacyPolicy" className="footer-link">Privacy Policy</NavLink></li>
            <li><NavLink to="/TermsOfService" className="footer-link">Terms of Service</NavLink></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;
