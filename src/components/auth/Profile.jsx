import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth.jsx';
import api from '../../api/api';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setUsername(userData.username);
        setRole(userData.role);
        setIsVerified(userData.isVerified);
        setTwoFactorEnabled(userData.twoFactorEnabled);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [auth]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.put('/auth/profile', 
        { name, password, twoFactorEnabled }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuth({ ...auth, user: response.data });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Profile update failed');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {!isEditing ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Email Verified:</strong> {isVerified ? 'Yes' : 'No'}</p>
          <p><strong>Two-Factor Authentication:</strong> {twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="twoFactorEnabled">
              <input
                type="checkbox"
                id="twoFactorEnabled"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              />
              Enable Two-Factor Authentication
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
