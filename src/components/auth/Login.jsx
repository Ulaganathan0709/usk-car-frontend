// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { useAuth } from '../../context/useAuth.jsx';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const navigate = useNavigate();
  const {  setAuth } = useAuth();

  // Automatically log in the user if a token exists in localStorage and the user is marked as logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token && userData) {
      setAuth(userData); // Initialize auth state from localStorage
      navigate('/cars'); // Redirect to the main page
    }
  }, [navigate, setAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.twoFactorRequired) {
        setTwoFactorRequired(true);
        toast.info('Two-Factor Authentication code required');
      } else {
        if (response.data.user && response.data.token) {
          localStorage.setItem('token', response.data.token); // Store token in localStorage
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in localStorage
          setAuth(response.data.user);
          localStorage.setItem('isLoggedIn', 'true');
          toast.success('Login successful');
          navigate('/cars');
        } else {
          toast.error('Login failed: Invalid response from server');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };
  
  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/verify-2fa', { email, twoFactorCode });

      if (response.data.user && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in localStorage
        setAuth(response.data.user);
        localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn in localStorage
        toast.success('Login successful');
        navigate('/cars'); // Redirect to "View Cars" page
      } else {
        toast.error('2FA verification failed: Invalid response from server');
      }
      
    } catch (err) {
      console.error('2FA verification error:', err); // Log the error to console for debugging
      toast.error(err.response?.data?.message || '2FA verification failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>Login to Your Account</h2>
        <form onSubmit={twoFactorRequired ? handleVerify2FA : handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {twoFactorRequired && (
            <div className="form-group">
              <label htmlFor="twoFactorCode">2FA Code:</label>
              <input
                id="twoFactorCode"
                type="text"
                placeholder="Enter your 2FA code"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                required
              />
            </div>
          )}
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me next time</label>
          </div>
          <button type="submit">{twoFactorRequired ? 'Verify 2FA Code' : 'Login'}</button>
        </form>
        <p>
          Forgot your password? <Link to="/forgotpassword">Request a new one</Link>.
        </p>
        <p>
          Don’t have an account? <Link to="/register">Sign Up</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
