import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';

import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';
import Button from '../../atoms/button/Button';
import FileUpload from '../../atoms/fileUpload/FileUpload';
import DynamicInfo from '../../atoms/dynamicInfo/DynamicInfo';
import BasicTabs from '../../atoms/tabs/Tabs';

import FileUploadIcon from '../../atoms/icons/fileUpload/FileUploadIcon';
import PlusIcon from '../../atoms/icons/plus/PlusIcon';
import Input from '../../atoms/input/Input';
import { UserIcon } from '../../atoms/icons/user/UserIcon';
import { FolderIcon } from '../../atoms/icons/folder/Folder';
import { FileIcons } from '../../atoms/icons/fileIcons/FileIcons';

import {
  MyTabs,
  ResponseErrorCode,
  ExecutionInfo,
  StorageInfoResponse
} from '../../../common/types';
import {
  convertSizeToMB,
  convertToPercentages,
  errorToast,
  getCurrentDateAndTime,
  runCommandTooltip,
  showToastError,
  successToast,
  transformDateAndTime,
  truncateString,
  updateStorage
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrow from '@mui/icons-material/PlayArrow';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import PopUp from '../../molecules/popUp/PopUp';

import { AxiosError } from 'axios';
import codeExecutionService from '../../../services/codeExecutionService';

import classNames from 'classnames';
import './dashboard.css';
import '../../../common/styles/muiStyles.css';
import { UserGearIcon } from '../../atoms/icons/userGear/UserGearIcon';
import { toastMessages } from '../../../common/messages';
import LinearProgress from '@mui/material/LinearProgress';

const Dashboard = () => {
  const {
    isLoading,
    selectedFolder,
    myOrganizations: folders,
    organizationFiles: files
  } = useAppSelector((state) => state.fileManage);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [disableRunButton, setDisableRunButton] = useState(false);
  const [currentFileId, setCurrentFileId] = useState<number>();
  const [executionFileInfo, setExecutionFileInfo] = useState<ExecutionInfo[]>([]);
  const [rowsData, setRowsData] = useState<object[]>([]);
  const [paramsId, setParamsId] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [storage, setStorage] = useState<StorageInfoResponse>();

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
    dispatch(getUserFolders({ pageSize: 10 }));
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
        dispatch(getOrganizationFiles({ organizationId: selectedFolder?.organization.id }));
      })
      .catch((error) => {
        setExecutionFileInfo((oldArray) =>
          oldArray.filter((_, index) => index !== executionFileInfo.length)
        );
        setDisableRunButton(false);
        showToastError(error);
        dispatch(getOrganizationFiles({ organizationId: selectedFolder?.organization.id }));
      });
  };

  const downloadHandle = (params: GridCellParams) => {
    fileManagementService
      .downloadFile(params.row.id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', params.row.file);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        errorToast(error);
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

  const inputValueHandler: ChangeEventHandler<HTMLInputElement> = (event) =>
    setInputValue(event.target.value);
  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      await fileManagementService.createOrganization(inputValue);
      setCreateModalIsOpen(false);
      dispatch(getUserFolders({ pageSize: 10 }));
      successToast(toastMessages.successfulFolderCreation);
    } catch (error) {
      let errCode: ResponseErrorCode = '';
      if (error instanceof AxiosError) {
        errCode = error.response?.data.message;
      }
      errorToast(errCode);
    }
  };

  const generateColumns = () => {
    const columnsData = [
      {
        id: 1,
        field: 'file',
        headerName: 'File',
        flex: 2,
        sortable: false,

        renderCell: (params: GridCellParams) => {
          const fileExtension = params.row.file.match(/\.[0-9a-z]+$/i)[0];
          return (
            <Box
              sx={{
                outline: 'none',
                border: 'none',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <FileIcons fileExtension={fileExtension} />

              <Tooltip title={params.row.file} placement="right">
                <div>{truncateString(params.row.file, 29)}</div>
              </Tooltip>
            </Box>
          );
        }
      },
      {
        id: 2,
        field: 'creationDate',
        headerName: 'Creation date',
        flex: 2,
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
        width: 200,
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
                    '&:hover': { background: 'none' },
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
                sx={{ marginRight: 2, '&:hover': { background: 'none' } }}
                onClick={() => {
                  downloadHandle(params);
                }}>
                <Tooltip title="Download File">
                  <CloudDownloadIcon className="cloudDownloadIcon" />
                </Tooltip>
              </IconButton>

              <IconButton
                sx={{ marginRight: 2, '&:hover': { background: 'none' } }}
                onClick={() => {
                  openDeleteFileModal();
                  setParamsId(JSON.stringify(params.id));
                  return params.id;
                }}>
                <Tooltip title={'Delete File'}>
                  <DeleteIcon className="deleteIcon" />
                </Tooltip>
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

  const closeCreateModal = () => setCreateModalIsOpen(false);
  const openCreateModal = () => setCreateModalIsOpen(true);

  const deleteFile = async (): Promise<void> => {
    if (files && paramsId !== null) {
      const fileForDelete = files.content.find((file) => file.id === +paramsId);
      try {
        if (fileForDelete !== undefined) {
          const response = await fileManagementService.deleteFile(fileForDelete.id);

          if (response.deleted) {
            successToast(toastMessages.successfulDelete);
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

  const renderUserIcon = () => {
    if (userData?.roles[0] && userData?.roles[0].name === 'ROLE_ADMIN') {
      return <UserGearIcon />;
    } else if (userData?.roles[0] && userData?.roles[0].name === 'ROLE_USER') {
      return <UserIcon />;
    }
    return <></>;
  };

  // updateStorage(setStorage);
  // console.log(convertToPercentages(storage?.maxSpace, storage?.occupiedSpace));

  return (
    <div className="dashboard">
      <div className="main-side-user">
        <div className="main-side-user-profile">{renderUserIcon()}</div>
        <div className="main-side-user-info">
          <span className="main-side-user-info__username">{username}</span>
          <span className="main-side-user-info__email">{truncateString(email, 30)}</span>
        </div>
        <Box sx={{ width: '10rem' }}>
          <Tooltip
            title={
              convertToPercentages(storage?.maxSpace, storage?.occupiedSpace).toFixed(2) + '%'
            }>
            <LinearProgress
              variant="determinate"
              value={convertToPercentages(storage?.maxSpace, storage?.occupiedSpace)}
            />
          </Tooltip>
        </Box>
      </div>
      <div className="main-content-container">
        <aside className="main-side">
          <div className="main-side-folders__container">
            <Button
              onClick={openCreateModal}
              className="button hover add-folder"
              type="button"
              label={'Add folder'}
              svg={<PlusIcon />}
            />

            {myFolders}
          </div>
        </aside>
        <div className="main-content">
          <div className="main-content-files-and-upload">
            <div className="files-upload">
              <Button
                onClick={openModal}
                className="button upload small"
                type="button"
                label={'Upload file'}
                svg={<FileUploadIcon />}
              />
            </div>
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
                    rowCount={files?.totalElements}
                    paginationMode="server"
                    autoPageSize={true}
                    disableColumnMenu
                  />
                )}
              </CacheProvider>
            </div>
          </div>
          <div className="tabs__container">
            <BasicTabs
              tabs={tabs}
              executionInfo={executionFileInfo}
              currentFileId={currentFileId}
            />
          </div>
        </div>
      </div>
      <BreadCrumbs />
      <PopUp label={'Upload File'} isOpen={modalIsOpen} closeModal={closeModal}>
        <FileUpload
          closePopUp={setModalIsOpen}
          setPageIndex={setCurrentPage}
          setStorage={setStorage}
        />
      </PopUp>

      <PopUp label={'Create Folder'} isOpen={createModalIsOpen} closeModal={closeCreateModal}>
        <div className="create-folder-modal">
          <form onSubmit={submitHandler}>
            <Input
              type="text"
              name="add"
              className="input-fluid"
              placeholder="Choose folder name"
              onChange={inputValueHandler}
              inputWrapperClassname="folder-name"
            />
            <div className="modalButtons">
              <Button
                label="Cancel"
                type="button"
                className="button cancel"
                onClick={closeCreateModal}
              />
              <Button
                label="Submit"
                type="submit"
                className="button"
                disabled={!inputValue.length}
              />
            </div>
          </form>
        </div>
      </PopUp>
      <PopUp label={'Delete File'} isOpen={deleteModalIsOpen} closeModal={closeDeleteFileModal}>
        <div className="deleteFile-wrapper">
          <div className="deleteFile-wrapper--message">
            Are you sure you want to delete this file?
          </div>

          <div className="modalButtons">
            <Button
              onClick={closeDeleteFileModal}
              className="button delete cancel"
              type="button"
              label="Cancel"
            />
            <Button onClick={deleteFile} className="button delete" type="button" label={'Delete'} />
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default Dashboard;
