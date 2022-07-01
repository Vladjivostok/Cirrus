import React from 'react';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import './dashboard.css';

const userData = {
  username: 'Username',
  email: 'email@email.com'
};

const Dashboard = () => {
  return (
    <div className="dashboard">
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
      <BreadCrumbs />
    </div>
  );
};

export default Dashboard;
