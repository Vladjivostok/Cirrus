import React, { useEffect } from 'react';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';

import { truncateString } from '../../../common/utility';

import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';

import { getLocalUser } from '../../../store/redux/auth/authSlice';
import { getUserFolders } from '../../../store/redux/fileManagement/files&FoldersSlice';

import { setCurrentFolder } from '../../../store/redux/fileManagement/files&FoldersSlice';

import classNames from 'classnames';

import './dashboard.css';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const folders = useAppSelector((state) => state.fileManage.myOrganizations);

  const currentFolder = useAppSelector((state) => state.fileManage.selectedFolder);

  const username = userData?.username;
  const email = userData?.email;

  useEffect(() => {
    if (folders) {
      dispatch(setCurrentFolder(folders[0]));
    }

    return;
  }, [folders]);

  useEffect(() => {
    dispatch(getLocalUser());
    dispatch(getUserFolders());
  }, []);

  const selectFolder = (event: React.MouseEvent<HTMLButtonElement>) => {
    const folder = folders?.find((folder) => folder.organization.id === +event.currentTarget.id);
    dispatch(setCurrentFolder(folder));
  };

  const myFolders = folders?.map((organizationData) => {
    const title = organizationData.organization.name;

    const folderButtonClassName = classNames({
      folder: true,
      focused:
        currentFolder !== null && organizationData.organization.id === currentFolder.organization.id
    });

    const shortenedTitles = truncateString(title, 15);

    return (
      <FolderIcon
        title={shortenedTitles}
        className={folderButtonClassName}
        id={organizationData.organization.id}
        key={organizationData.organization.id}
        onClick={selectFolder}
      />
    );
  });

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
        <div className="main-side-folders__container">{myFolders}</div>
      </aside>
      <div className="main-content">
        <div className="files"></div>
        <div className="dynamic-info"></div>
      </div>
      <BreadCrumbs />
    </div>
  );
};

export default Dashboard;
