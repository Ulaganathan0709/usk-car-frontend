import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css'; // Import the CSS file for the animation

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback values in case location.state is null
  const { amount } = location.state || {};

  // If there's no amount in the state, redirect to the homepage or an appropriate page
  if (!amount) {
    navigate('/');
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="success-container">
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <h2>Payment Successful!</h2>
      <p>Your payment of ₹{amount} was completed successfully.</p>
    </div>
  );
};

export default Success;
