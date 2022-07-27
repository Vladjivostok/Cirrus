import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';
import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';
import Button from '../../atoms/button/Button';
import {
  breakEmail,
  convertSizeToMB,
  errorToast,
  getCurrentDateAndTime,
  runCommandTooltip,
  showToastError,
  transformDateAndTime,
  truncateString
} from '../../../common/utility';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLocalUser } from '../../../store/redux/auth/authSlice';
import {
  getOrganizationFiles,
  getUserFolders
} from '../../../store/redux/fileManagement/fileManagemantSlice';

import { setCurrentFolder } from '../../../store/redux/fileManagement/fileManagemantSlice';

import fileManagementService from '../../../services/fileManagementService';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import classNames from 'classnames';
import './dashboard.css';
import '../../../common/styles/muiStyles.css';
import PopUp from '../../molecules/popUp/PopUp';
import FileUpload from '../../atoms/fileUpload/FileUpload';
import DynamicInfo from '../../atoms/dynamicInfo/DynamicInfo';
import FileUploadIcon from '../../atoms/icons/fileUpload/FileUploadIcon';
import BasicTabs from '../../atoms/tabs/Tabs';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import { MyTabs, ResponseErrorCode, ExecutionInfo } from '../../../common/types';
import { AxiosError } from 'axios';
import codeExecutionService from '../../../services/codeExecutionService';
import Tooltip from '@mui/material/Tooltip';

const Dashboard = () => {
  const {
    isLoading,
    selectedFolder,
    myOrganizations: folders,
    organizationFiles: files
  } = useAppSelector((state) => state.fileManage);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [disableRunButton, setDisableRunButton] = useState(false);
  const [currentFileId, setCurrentFileId] = useState<number>();
  const [executionFileInfo, setExecutionFileInfo] = useState<ExecutionInfo[]>([]);
  const [rowsData, setRowsData] = useState<object[]>([]);
  const [paramsId, setParamsId] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.auth.userData);
  const currentFolder = useAppSelector((state) => state.fileManage.selectedFolder);

  const username = userData?.username;
  const email = userData?.email;

  useEffect(() => {
    if (files?.content.length) {
      setRowsData(
        files?.content.map((item) => ({
          id: item.id,
          file: item.name,
          creationDate: transformDateAndTime(item.createdAt, false),
          fileSize: convertSizeToMB(item.fileSize)
        }))
      );
    } else {
      setRowsData([]);
    }
  }, [files]);

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
    if (selectedFolder)
      dispatch(getOrganizationFiles({ organizationId: selectedFolder?.organization.id }));
  }, [selectedFolder]);

  const myFolders = folders?.map((organizationData) => {
    const folderButtonClassName = classNames({
      folder: true,
      focused:
        selectedFolder !== null &&
        organizationData.organization.id === selectedFolder.organization.id
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

  const checkType = (fileId: number) => {
    return files?.content.find((element) => element.id === fileId && element.fileType === 'CODE');
  };

  const runHandler = async (params: GridCellParams) => {
    setCurrentFileId(params.row.id);
    setDisableRunButton(true);
    setExecutionFileInfo((oldArray) => [
      ...oldArray,
      {
        executionInfo: null,
        fileId: params.row.id,
        loading: true
      }
    ]);

    codeExecutionService
      .userDemandExecute(
        params.row.id,
        params.row.file,
        currentFolder?.organization.id,
        currentFolder?.organization.name
      )
      .then((response) => {
        const executeTime = getCurrentDateAndTime();

        setExecutionFileInfo((oldArray) =>
          oldArray.filter((_, index) => index !== executionFileInfo.length)
        );

        setExecutionFileInfo((oldArray) => [
          ...oldArray,
          {
            executionInfo: {
              fileName: params.row.file,
              organizationId: currentFolder?.organization.id,
              organizationName: currentFolder?.organization.name,
              response: JSON.stringify(response),
              time: transformDateAndTime(executeTime, true)
            },
            fileId: params.row.id,
            loading: false
          }
        ]);
        setDisableRunButton(false);
      })
      .catch((error) => {
        setExecutionFileInfo((oldArray) =>
          oldArray.filter((_, index) => index !== executionFileInfo.length)
        );
        setDisableRunButton(false);
        showToastError(error);
      });
  };

  const handlePageChange = (pageNumberProp: number) => {
    const pageNumber = pageNumberProp + 1;

    setCurrentPage(pageNumber);

    dispatch(
      getOrganizationFiles({
        organizationId: selectedFolder?.organization.id,
        pageNumber
      })
    );
  };

  const generateColumns = () => {
    const columnsData = [
      {
        id: 1,
        field: 'file',
        headerName: 'File',
        flex: 1,
        sortable: false,
        renderCell: (params: GridCellParams) => {
          return <div title={params.row.file}>{truncateString(params.row.file, 29)}</div>;
        }
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
        width: 150,
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
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              {checkType(params.row.id) && (
                <IconButton
                  sx={{
                    marginRight: 2
                  }}
                  disabled={disableRunButton}
                  onClick={async () => {
                    runHandler(params);
                  }}>
                  <Tooltip title={runCommandTooltip}>
                    <PlayArrow className="playArrow" />
                  </Tooltip>
                </IconButton>
              )}

              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => {
                  openDeleteFileModal();
                  setParamsId(JSON.stringify(params.id));
                  return params.id;
                }}>
                <DeleteIcon className="deleteIcon" />
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
    if (files && paramsId !== null) {
      const fileForDelete = files.content.find((file) => file.id === +paramsId);
      try {
        if (fileForDelete !== undefined) {
          const response = await fileManagementService.deleteFile(fileForDelete.id);

          if (response.deleted) {
            setCurrentPage(1);
            dispatch(getOrganizationFiles({ organizationId: selectedFolder?.organization.id }));
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

  const executeResponseTabRendering = (label: string, component: JSX.Element) => {
    tabs.push({
      label: label,
      component: component
    });
  };

  const tabs: MyTabs[] = [];

  executeResponseTabRendering(
    'Execute Response',
    <DynamicInfo
      executionInfo={executionFileInfo}
      setExecutionInfo={setExecutionFileInfo}
      setDisableRunButton={setDisableRunButton}
      disableRunButton={disableRunButton}
      currentFileId={currentFileId}></DynamicInfo>
  );

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
            {rowsData && files && (
              <DataGrid
                onRowClick={(param) => setCurrentFileId(parseInt(JSON.stringify(param.id)))}
                rows={rowsData}
                loading={isLoading}
                columns={generateColumns()}
                pagination
                onPageChange={handlePageChange}
                pageSize={10}
                page={currentPage - 1}
                autoHeight={false}
                disableSelectionOnClick
                rowCount={files?.totalElements}
                paginationMode="server"
                autoPageSize={true}
                disableColumnMenu
              />
            )}
          </CacheProvider>
        </div>
        <BasicTabs tabs={tabs} executionInfo={executionFileInfo} currentFileId={currentFileId} />
      </div>
      <BreadCrumbs />
      <PopUp label={'Upload File'} isOpen={modalIsOpen} closeModal={closeModal}>
        <FileUpload closePopUp={setModalIsOpen} setPageIndex={setCurrentPage} />
      </PopUp>

      <PopUp label={'Delete File'} isOpen={deleteModalIsOpen} closeModal={closeDeleteFileModal}>
        <div className="deleteFile-wrapper">
          <div className="deleteFile-wrapper--message">
            Are you sure you want to delete this file?
          </div>

          <div>
            <Button
              onClick={deleteFile}
              className="button upload delete left"
              type="button"
              label={'Delete File'}
            />
            <Button
              onClick={closeDeleteFileModal}
              className="button upload delete right"
              type="button"
              label="Cancel"
            />
          </div>
        </div>
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
