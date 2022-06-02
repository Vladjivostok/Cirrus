import React, { useEffect } from 'react';
// import './App.css';
import { LoginService } from './services/loginService';
import { User } from './common/types';
import { login } from './features/auth/authSlice';

import authSlice from './features/auth/authSlice';

import { useAppSelector, useAppDispatch } from './store/hooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData: User = { username: 'morpheus', password: 'leader01' };
  useAppSelector((state) => console.log('From selector ====>  ', state.auth));

  useEffect(() => {
    // LoginService.login(userData);

    dispatch(login(userData));
  }, []);

  return <div className="App"></div>;
};

export default App;
