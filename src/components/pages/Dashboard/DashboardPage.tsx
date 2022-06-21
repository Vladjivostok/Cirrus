import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { updateUser } from '../../../store/redux/auth/authSlice';

import { LogoutIcon } from '../../atoms/icons/logoutIcon/LogoutIcon';

import logo from '../../../assets/Cirrus.png';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';
import LocalStorageService from '../../../services/localStorageService';

import './dashboard.css';

const userData = {
  username: 'Username',
  email: 'email@email.com'
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    LocalStorageService.removeItem('user');
    if (LocalStorageService.getItem('user') === null) {
      dispatch(updateUser(null));
      navigate('/login');
    }
  };

  return (
    <div className="dashboard">
      <div className="nav">
        <div className="nav__item">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav__item">
          <LogoutIcon onClick={logout}></LogoutIcon>
        </div>
      </div>
      <main className="main">
        <aside className="main-side">
          <div className="main-side-user">
            <div className="main-side-user-profile">
              <UserIcon />
            </div>
            <div className="main-side-user-info">
              <span className="main-side-user-info__username">{userData.username}</span>
              <span className="main-side-user-info__email">{userData.email}</span>
            </div>
          </div>
          <div className="main-side-folders__container">
            <FolderIcon title="Root Folder" />
          </div>
        </aside>
        <div className="main-content"></div>
      </main>
    </div>
  );
};

export default Dashboard;
