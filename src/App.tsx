import React, { useEffect } from 'react';
// import './App.css';
import { LoginService } from './services/loginService';
import { User } from './common/types';

const App: React.FC = () => {
  const userData: User = { username: 'morpheus', password: 'leader01' };

  useEffect(() => {
    LoginService.login(userData);
  }, []);

  return <div className="App"></div>;
};

export default App;
