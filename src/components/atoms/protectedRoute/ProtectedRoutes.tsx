import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRoute = {
  isEnabled: boolean;
  children: JSX.Element;
};

const ProtectedRoutes = ({ isEnabled, children }: ProtectedRoute) => {
  if (!isEnabled || localStorage.getItem('user') === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
