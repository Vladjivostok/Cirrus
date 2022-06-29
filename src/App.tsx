import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './components/pages/Login/LoginPage';
import RegistrationPage from './components/pages/Registration/RegistrationPage';
import Dashboard from './components/pages/Dashboard/DashboardPage';
import RequestPasswordRecovery from './components/pages/RequestPasswordRecovery/RequestPasswordRecovery';
import PageNotFound from './components/atoms/pageNotFound/PageNotFound';

import { useAppDispatch, useAppSelector } from './store/hooks';

import ProtectedRoutes from './components/atoms/protectedRoute/ProtectedRoutes';
import LocalStorageService from './services/localStorageService';
import { updateUser } from './store/redux/auth/authSlice';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [state, setState] = useState<{ finishedChecking: boolean; isAuth: boolean }>({
    finishedChecking: false,
    isAuth: false
  });

  const userStorageToken = LocalStorageService.getItem('user');

  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((store) => store.auth.user);

  useEffect(() => {
    if (userStorageToken) {
      dispatch(updateUser(JSON.parse(userStorageToken)));
      setState({ finishedChecking: true, isAuth: state.isAuth });
    }
  }, []);

  useEffect(() => {
    if (loggedUser && userStorageToken !== null) {
      setState({ finishedChecking: true, isAuth: true });
    }
  }, [loggedUser]);
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<RequestPasswordRecovery />} />
          <Route path="/registration/:token" element={<RegistrationPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes isEnabled={state.isAuth}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
