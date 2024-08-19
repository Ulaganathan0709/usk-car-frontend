import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';

const Refund = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, last4 } = location.state || {};

  useEffect(() => {
    console.log('Amount:', amount, 'Last4:', last4);
    if (!amount || !last4) {
      navigate('/');
    }
  }, [amount, last4, navigate]);

  if (!amount || !last4) {
    return null;
  }

  return (
    <div className="refund-container">
      <div className="refund-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <h2>Refund Processed!</h2>
      <p>Your refund of ₹{amount} has been processed and will be credited to your account ending in {last4} within 2-3 business days.</p>
    </div>
  );
};

export default Refund;
