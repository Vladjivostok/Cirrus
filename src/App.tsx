import React from 'react';
import './App.css';
import LoginPage from './components/pages/Login/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<LoginPage />} path="/" />
        </Routes>
      </Router>
    </>
  );
};

export default App;
