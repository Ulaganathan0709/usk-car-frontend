import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import api from '../api/api';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setAuth(response.data);
          localStorage.setItem('isLoggedIn', 'true');  // Set isLoggedIn in localStorage
        } catch (err) {
          console.error('Failed to authenticate', err);
          setAuth(null);
          Cookies.remove('token');
          localStorage.removeItem('isLoggedIn');  // Remove isLoggedIn if authentication fails
        }
      } else {
        setAuth(null);
        localStorage.removeItem('isLoggedIn');  // Remove isLoggedIn if no token
      }
    };

    checkAuth();
  }, []);

  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
