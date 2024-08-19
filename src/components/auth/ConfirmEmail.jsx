import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';

const ConfirmEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await api.get(`/auth/confirm/${token}`);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect to login after 3 seconds
      } catch (error) {
        toast.error('Email confirmation failed. Please try again.');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Confirmation</h2>
    </div>
  );
};

export default ConfirmEmail;
