import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { currentUser, isUserLoading } = useAuth();
  if (isUserLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return currentUser ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
