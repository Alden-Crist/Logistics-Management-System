import React from 'react';
import './Home.css';
import logo from './logo.png'; // Update with your logo path
import backgroundImage from './main-bg.jpg'; // Update with your image path
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
    <header id="header">
        <nav>
          <div className="logo">
            <img src={logo} alt="Appvila Logo" className="logo-img" />
          </div>
          <ul className="nav-links">
            <li><NavLink to="/Home" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/Admin" className="nav-link">Admin</NavLink></li>
            <li><NavLink to="/CustomerSignUp" className="nav-link">Customer</NavLink></li>
            <li><NavLink to="/home" className="nav-link">Supplier</NavLink></li>
            <li><NavLink to="/Home" className="nav-link">Features</NavLink></li>
            <li><NavLink to="/Home" className="nav-link">Services</NavLink></li>
            <li><NavLink to="/Home" className="nav-link">Contact</NavLink></li>
          </ul>
        </nav>
      </header>

      <section className="header-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container">
          <h1>Safe & Reliable Logistic Solutions!</h1>
          <p>For Order Status Inquiry</p>
          <div className="track-form">
            <input type="text" placeholder="Your Tracking ID" />
            <button>Track & Trace</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
