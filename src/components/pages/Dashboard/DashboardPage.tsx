import React, { useEffect } from 'react';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';
import Button from '../../atoms/button/Button';

import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';

import { getLocalUser } from '../../../store/redux/auth/authSlice';
import { getUserFolders } from '../../../store/redux/fileManagement/files&FoldersSlice';

import { setCurrentFolder } from '../../../store/redux/fileManagement/files&FoldersSlice';

import classNames from 'classnames';

import './dashboard.css';
import PopUp from '../../molecules/popUp/PopUp';
import FileUpload from '../../atoms/fileUpload/FileUpload';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const folders = useAppSelector((state) => state.fileManage.myOrganizations);

  const currentFolder = useAppSelector((state) => state.fileManage.selectedFolder);

  const username = userData?.username;
  const email = userData?.email;

  const breakEmail = (email: string | undefined) => {
    let splitEmail: string[] | undefined;
    if (email != undefined && email.length > 15) {
      splitEmail = email.split('@');
      return splitEmail[0] + '\n@' + splitEmail[1];
    }
    return email;
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
    const folderButtonClassName = classNames({
      folder: true,
      focused:
        currentFolder !== null && organizationData.organization.id === currentFolder.organization.id
    });

    return (
      <FolderIcon
        title={organizationData.organization.name}
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
            <span className="main-side-user-info__email">{breakEmail(email)}</span>
          </div>
        </div>
        <div className="main-side-folders__container">{myFolders}</div>
      </aside>
      <div className="main-content">
        <Button
          onClick={openModal}
          className="button upload small"
          type="button"
          label={'Upload file'}
        />
        <div className="files"></div>
        <div className="dynamic-info"></div>
      </div>
      <BreadCrumbs />
      <PopUp label={'Upload File'} isOpen={modalIsOpen} closeModal={closeModal}>
        <FileUpload closePopUp={setModalIsOpen} />
      </PopUp>
    </div>
  );
};

export default Dashboard;
