import React from 'react';
import './App.css';
import LoginPage from './components/pages/Login/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path="/" />
      </Routes>
    </Router>
  );
};

export default App;
