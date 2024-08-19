import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../src/utils/api';
import { useAuth } from '../context/useAuth';
import './Header.css';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  // Check for token in localStorage and validate it on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Make an API call to validate the token
          const response = await api.get('/auth/validate-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            // If token is valid, update auth state with user details
            setAuth(response.data.user);
          } else {
            // If token is invalid, clear the token and auth state
            localStorage.removeItem('token');
            setAuth(null);
          }
        } catch (error) {
          // Handle any errors during token validation
          localStorage.removeItem('token');
          setAuth(null);
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [setAuth, navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        setAuth(null);
        toast.success('Logged out successfully');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Failed to logout');
      navigate('/login');
    }
  };

  return (
    <header>
      <div className="top-bar">
        <div className="contact-info">
          <span><i className="fas fa-phone"></i> 1-800-123-4567</span>
          <span><i className="fas fa-map-marker-alt"></i> 123 X 4TH Street, San Jose, CA 123456</span>
        </div>
        <div className="social-login">
          {!auth && <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
          </>}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Connect with Facebook</a>
        </div>
      </div>

      <div className="main-header">
        <div className="logo">
          <Link to="/">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-rental-logo-design-template-5992195e3c0f4fa87da152a4e08595c4_screen.jpg?ts=1712666908"
              alt="Company Logo"
            />
          </Link>
        </div>
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/cars">View Cars</Link>
          {auth ? (
            <>
              {auth.role === 'user' && (
                <>
                  <Link to="/bookings">View Bookings</Link>
                  <Link to="/profile">Profile</Link>
                </>
              )}
              {auth.role === 'admin' && (
                <>
                  <Link to="/admin">Admin Dashboard</Link>
                  <Link to="/profile">Profile</Link>
                </>
              )}
              {auth.role === 'seller' && (
                <>
                  <Link to="/profile">Profile</Link>
                </>
              )}
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
