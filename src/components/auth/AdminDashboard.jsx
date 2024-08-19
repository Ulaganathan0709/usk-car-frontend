import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/useAuth.jsx';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchPendingSellers = async () => {
      try {
        const response = await api.get('/auth/pending-sellers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingSellers(response.data);
      } catch (error) {
        toast.error('Failed to fetch pending sellers');
      }
    };

    fetchPendingSellers();
  }, [auth]);

  const handleApprove = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await api.post('/auth/approve-seller', { userId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingSellers(pendingSellers.filter((seller) => seller._id !== userId));
      toast.success('Seller approved successfully');
    } catch (error) {
      toast.error('Failed to approve seller');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingSellers.map((seller) => (
            <tr key={seller._id}>
              <td>{seller.username}</td>
              <td>{seller.email}</td>
              <td>{seller.role}</td>
              <td>
                <button className="approve-button" onClick={() => handleApprove(seller._id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
