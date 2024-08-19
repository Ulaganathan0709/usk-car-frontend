import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <div className="banner-content">
          <h1>WELCOME TO USK CARS</h1>
          <h2>CAR RENTAL DEALS</h2>
          <p>LIVE THE LIFE</p>
          <Link to="/cars" className="banner-button">View Cars</Link>
        </div>
      </div>
      <div className="info-section">
        <h2>Best Car Rental In The City</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus vitae massa semper aliquam quis mattis quam. Morbi vitae tortor tempus, placerat leo et, suscipit lectus. Phasellus ut euismod massa, eu eleifend ipsum.
        </p>
        <Link to="/plans" className="plans-button">Plans!</Link>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Modern Fleet</h3>
          <p>Latest models with top features</p>
        </div>
        <div className="feature">
          <h3>Special Prices</h3>
          <p>Competitive rates for every budget</p>
        </div>
        <div className="feature">
          <h3>Full Insurance Plan</h3>
          <p>Drive with peace of mind</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
