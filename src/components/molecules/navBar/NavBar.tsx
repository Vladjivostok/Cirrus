import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { updateUser } from '../../../store/redux/auth/authSlice';
import { LogoutIcon } from '../../atoms/icons/logoutIcon/LogoutIcon';
import { InviteUserIcon } from '../../atoms/icons/inviteUser/InviteUserIcon';

import logo from '../../../assets/Cirrus.png';
import LocalStorageService from '../../../services/localStorageService';

import './navBar.css';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.auth.userData);

  const logout = () => {
    LocalStorageService.removeItem('user');
    LocalStorageService.removeItem('userData');

    if (LocalStorageService.getItem('user') === null) {
      dispatch(updateUser(null));
      navigate('/login');
    }
  };

  const navigateHome = () => {
    navigate('/dashboard');
  };

  const navigateToInviteUserPage = () => {
    LocalStorageService.getItem('user');
    if (LocalStorageService.getItem('user')) {
      navigate('/admin/user-invitation');
    }
  };

  let role;

  if (userData?.roles[0]) {
    role = userData?.roles[0].name;
  }

  return (
    <div className="nav">
      <div className="nav__item nav__item--logo">
        <img onClick={navigateHome} src={logo} alt="logo" />
      </div>
      {role === 'ROLE_ADMIN' && (
        <div className="nav__item">
          <InviteUserIcon onClick={navigateToInviteUserPage} />
        </div>
      )}

      <div className="nav__item nav__item--bottom">
        <LogoutIcon onClick={logout}></LogoutIcon>
      </div>
    </div>
  );
};

export default NavBar;
