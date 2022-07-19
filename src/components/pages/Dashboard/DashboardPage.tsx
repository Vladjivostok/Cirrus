import React, { useEffect, useState } from 'react';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';
import Button from '../../atoms/button/Button';

import { convertSizeToMB, removeExtension, truncateFileDate } from '../../../common/utility';
import { columns } from '../../../common/constants';

import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';

import { getLocalUser } from '../../../store/redux/auth/authSlice';
import {
  getOrganizationFiles,
  getUserFolders
} from '../../../store/redux/fileManagement/files&FoldersSlice';

import { setCurrentFolder } from '../../../store/redux/fileManagement/files&FoldersSlice';

import { DataGrid } from '@mui/x-data-grid';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import classNames from 'classnames';

import './dashboard.css';
import '../../../common/styles/muiStyles.css';
import PopUp from '../../molecules/popUp/PopUp';
import FileUpload from '../../atoms/fileUpload/FileUpload';
import FileUploadIcon from '../../atoms/icons/fileUpload/FileUploadIcon';

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowsData, setRowsData] = useState<object[]>([]);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const folders = useAppSelector((state) => state.fileManage.myOrganizations);

  const currentFolder = useAppSelector((state) => state.fileManage.selectedFolder);
  const organizationFiles = useAppSelector((state) => state.fileManage.organizationFiles);

  const username = userData?.username;
  const email = userData?.email;

  useEffect(() => {
    if (organizationFiles?.content.length) {
      setRowsData(
        organizationFiles?.content.map((item) => ({
          id: item.id,
          file: removeExtension(item.name),
          creationDate: truncateFileDate(item.createdAt),
          fileSize: convertSizeToMB(item.fileSize)
        }))
      );
    } else {
      setRowsData([]);
    }
  }, [organizationFiles]);

  const breakEmail = (email: string | undefined) => {
    let splitEmail: string[] | undefined;
    if (email != undefined && email.length > 15) {
      splitEmail = email.split('@');
      return splitEmail[0] + '\n@' + splitEmail[1];
    }
    return email;
  };

  const muiCache = createCache({
    key: 'mui',
    prepend: true
  });

  const selectFolder = (id: number | undefined) => {
    const folder = folders?.find((folder) => folder.organization.id === id);
    dispatch(setCurrentFolder(folder));
  };

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

  useEffect(() => {
    if (folders) dispatch(getOrganizationFiles(currentFolder?.organization.id));
  }, [currentFolder]);

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
        <Button
          onClick={openModal}
          className="button upload small"
          type="button"
          label={'Upload file'}
          svg={<FileUploadIcon />}
        />
        <div className="main-side-folders__container">{myFolders}</div>
      </aside>
      <div className="main-content">
        <div className="files">
          <CacheProvider value={muiCache}>
            {rowsData.length ? (
              <DataGrid
                rows={rowsData}
                columns={columns}
                pagination
                pageSize={10}
                autoHeight={true}
                disableSelectionOnClick
                autoPageSize={true}
                disableColumnMenu
              />
            ) : (
              ''
            )}
          </CacheProvider>
        </div>
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
