import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Failed.css'; // Import the CSS file for the failed page

const Failed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback values in case location.state is null
  const { reason } = location.state || {};

  // If there's no reason in the state, redirect to the homepage or an appropriate page
  if (!reason) {
    navigate('/');
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="failed-container">
      <div className="failed-crossmark">
        <div className="cross-icon">
          <span className="icon-line line-left"></span>
          <span className="icon-line line-right"></span>
          <div className="icon-circle"></div>
        </div>
      </div>
      <h2>Payment Failed!</h2>
      <p>{reason}</p>
      <p>Your booking has been canceled.</p>
    </div>
  );
};

export default Failed;
