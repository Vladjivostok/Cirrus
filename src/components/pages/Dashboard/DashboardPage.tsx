import React, { useEffect, useState } from 'react';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';
import Button from '../../atoms/button/Button';

import {
  convertSizeToMB,
  errorToast,
  removeExtension,
  truncateFileDate
} from '../../../common/utility';

import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';

import { getLocalUser } from '../../../store/redux/auth/authSlice';
import {
  getOrganizationFiles,
  getUserFolders
} from '../../../store/redux/fileManagement/files&FoldersSlice';

import { setCurrentFolder } from '../../../store/redux/fileManagement/files&FoldersSlice';

import fileManagementService from '../../../services/fileManagementService';

import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import classNames from 'classnames';

import './dashboard.css';
import '../../../common/styles/muiStyles.css';
import PopUp from '../../molecules/popUp/PopUp';
import FileUpload from '../../atoms/fileUpload/FileUpload';
import FileUploadIcon from '../../atoms/icons/fileUpload/FileUploadIcon';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import { ResponseErrorCode } from '../../../common/types';
import { AxiosError } from 'axios';

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [rowsData, setRowsData] = useState<object[]>([]);

  const [paramsId, setParamsId] = useState<null | string>(null);
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

  const generateColumns = () => {
    const columnsData = [
      {
        id: 1,
        field: 'file',
        headerName: 'File',
        flex: 1,
        sortable: false
      },
      {
        id: 2,
        field: 'creationDate',
        headerName: 'Creation date',
        flex: 1,
        sortable: false
      },
      {
        id: 3,
        field: 'fileSize',
        headerName: 'File size',
        flex: 1,
        sortable: false
      },
      {
        id: 4,
        field: 'actions',
        headerName: '',
        width: 120,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => {
          return (
            <Box
              sx={{
                outline: 'none',
                border: 'none',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <IconButton
                onClick={() => {
                  openDeleteFileModal();
                  setParamsId(JSON.stringify(params.id));
                  return params.id;
                }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        }
      }
    ];
    return columnsData;
  };

  const closeDeleteFileModal = () => setDeleteModalIsOpen(false);
  const openDeleteFileModal = () => setDeleteModalIsOpen(true);

  const deleteFile = async (): Promise<void> => {
    if (organizationFiles && paramsId !== null) {
      const fileForDelete = organizationFiles.content.find((file) => file.id === +paramsId);
      try {
        if (fileForDelete !== undefined) {
          const response = await fileManagementService.deleteFile(fileForDelete.id);
          if (response.deleted) {
            dispatch(getOrganizationFiles(currentFolder?.organization.id));
            setDeleteModalIsOpen(false);
          }
        }
      } catch (error) {
        let errCode: ResponseErrorCode = '';
        if (error instanceof AxiosError) {
          errCode = error.response?.data.message;
        }
        errorToast(errCode);
      }
    }
  };

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
            {rowsData && (
              <DataGrid
                rows={rowsData}
                columns={generateColumns()}
                pagination
                pageSize={10}
                autoHeight={true}
                disableSelectionOnClick
                autoPageSize={true}
                disableColumnMenu
              />
            )}
          </CacheProvider>
        </div>
        <div className="dynamic-info"></div>
      </div>
      <BreadCrumbs />

      <PopUp label={'Upload File'} isOpen={modalIsOpen} closeModal={closeModal}>
        <FileUpload closePopUp={setModalIsOpen} />
      </PopUp>

      <PopUp label={'Delete File'} isOpen={deleteModalIsOpen} closeModal={closeDeleteFileModal}>
        <div className="deleteFile-wrapper">
          <div className="deleteFile-wrapper--message">
            Are you sure, you want to delete this file?
          </div>

          <div>
            <Button
              onClick={deleteFile}
              className="button upload delete"
              type="button"
              label={'Delete File'}
            />
            <Button
              onClick={closeDeleteFileModal}
              className="button upload delete"
              type="button"
              label="Cancel"
            />
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default Dashboard;
