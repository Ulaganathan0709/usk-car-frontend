import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/api';
import './Auth.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/resetpassword/${token}`, { password });
      if (response.status === 200) {
        toast.success('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
