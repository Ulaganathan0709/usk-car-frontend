import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/forgotpassword', { email });
      if (response.status === 200) {
        toast.success('Password reset email sent');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending password reset email');
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
