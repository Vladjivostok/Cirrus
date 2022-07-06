import React, { useEffect } from 'react';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';

import { getLocalUser } from '../../../store/redux/auth/authSlice';

import './dashboard.css';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);

  const username = userData?.username;
  const email = userData?.email;

  useEffect(() => {
    dispatch(getLocalUser());
  }, []);

  return (
    <div className="dashboard">
      <aside className="main-side">
        <div className="main-side-user">
          <div className="main-side-user-profile">
            <UserIcon />
          </div>
          <div className="main-side-user-info">
            <span className="main-side-user-info__username">{username}</span>
            <span className="main-side-user-info__email">{email}</span>
          </div>
        </div>
        <div className="main-side-folders__container">
          <FolderIcon title="Root Folder" />
        </div>
      </aside>
      <div className="main-content"></div>
      <BreadCrumbs />
    </div>
  );
};

export default Dashboard;
