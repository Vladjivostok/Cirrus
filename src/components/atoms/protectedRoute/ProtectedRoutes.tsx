import React from 'react';
import { Navigate } from 'react-router-dom';

import LocalStorageService from '../../../services/localStorageService';
import NavBar from '../../molecules/navBar/NavBar';

type ProtectedRoute = {
  isEnabled?: boolean;
  children: JSX.Element;
};

const ProtectedRoutes = ({ isEnabled, children }: ProtectedRoute) => {
  if (!isEnabled || LocalStorageService.getItem('user') === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default ProtectedRoutes;
