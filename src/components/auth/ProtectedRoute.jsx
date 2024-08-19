import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useAuth();

  // Debugging: Log the auth state and roles
  console.log('ProtectedRoute: auth state:', auth);
  console.log('ProtectedRoute: roles required:', roles);

  // Check if user is authenticated
  if (!auth || !auth._id) {
    console.error('ProtectedRoute: User is not authenticated.');
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is authorized
  if (roles && !roles.includes(auth.role)) {
    console.error(`ProtectedRoute: User role (${auth.role}) is not authorized for this route.`);
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, allow access
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
