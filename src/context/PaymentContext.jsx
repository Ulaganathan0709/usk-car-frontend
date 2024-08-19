import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  return (
    <PaymentContext.Provider value={{ paymentDetails, setPaymentDetails }}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired, // Adding validation for children prop
};

export const usePayment = () => useContext(PaymentContext);
