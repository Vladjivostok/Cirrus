import { AxiosError } from 'axios';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { maxUploadFiles, maxUploadSize, uploadFileTypes } from '../../../common/fileUtils';
import { toastMessages } from '../../../common/messages';
import { ErrorsForUpload, ResponseErrorCode, StorageInfoResponse } from '../../../common/types';
import { convertSizeToMB, errorToast, successToast, updateStorage } from '../../../common/utility';
import fileManagementService from '../../../services/fileManagementService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getOrganizationFiles } from '../../../store/redux/fileManagement/fileManagemantSlice';
import Button from '../button/Button';

import './fileUpload.css';

type FileUploadProps = {
  closePopUp: Dispatch<SetStateAction<boolean>>;
  setPageIndex: Dispatch<SetStateAction<number>>;
  setStorage: React.Dispatch<React.SetStateAction<StorageInfoResponse | undefined>>;
};

const FileUpload: React.FC<FileUploadProps> = ({ closePopUp, setPageIndex, setStorage }) => {
  const user = useAppSelector((state) => state.auth.userData);
  const currentFolder = useAppSelector((state) => state.fileManage.selectedFolder);

  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: uploadFileTypes,
    maxFiles: maxUploadFiles,
    maxSize: maxUploadSize,
    multiple: false
  });

  const files = acceptedFiles.map((file) => (
    <li className="fileUpload__fileList" key={file.name}>
      {file.name} - {convertSizeToMB(file.size)}
    </li>
  ));

  const uploadError = (err: string) => {
    if (err === ErrorsForUpload.invalidType) {
      return 'Cannot upload this type of file';
    } else if (err === ErrorsForUpload.tooBig) {
      return `File too large, maximum upload size is ${convertSizeToMB(maxUploadSize)}`;
    }
    return 'Cannot upload this file';
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li className="fileUpload__fileList" key={file.name}>
      <h4>Rejected:</h4>- {file.name} - {convertSizeToMB(file.size)}
      <ul>
        {errors.map((e) => (
          <li className="fileUpload__fileList-error" key={e.code}>
            {uploadError(e.code)}
          </li>
        ))}
      </ul>
    </li>
  ));

  const uploadHandler = async () => {
    if (acceptedFiles.length !== 0) {
      setIsLoading(true);
      try {
        const response = await fileManagementService.uploadFile(
          acceptedFiles,
          user?.id,
          currentFolder?.organization.id,
          currentFolder?.organization.name
        );
        if (response.status == 200) {
          updateStorage(setStorage);
          successToast(toastMessages.successfulUpload);
          setPageIndex(1);
          dispatch(getOrganizationFiles({ organizationId: currentFolder?.organization.id }));
          closePopUp(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        let errCode: ResponseErrorCode = '';
        if (error instanceof AxiosError) {
          errCode = error.response?.data.message;
        }
        errorToast(errCode);
      }
    } else {
      setIsFileSelected(true);
    }
  };

  useEffect(() => {
    if (isFileSelected == true && acceptedFiles.length > 0) {
      setIsFileSelected(false);
    }
  }, [acceptedFiles.length]);

  const closeModalHandler = () => {
    closePopUp(false);
  };

  return (
    <div className="fileUpload">
      <h3 className="fileUpload__title">Choose a file to upload</h3>
      <div className="fileUpload__dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select a file</p>
      </div>
      <aside className="fileUpload__upload-info">
        {isFileSelected && <h4 className="fileUpload__errMsg">Nothing is selected</h4>}
        {files.length > 0 && <h4>Selected files:</h4>}
        <ul>{files}</ul>
        <ul>{fileRejectionItems}</ul>
      </aside>
      <div className="fileUpload__button-wrapper">
        <Button
          onClick={closeModalHandler}
          className="button cancel"
          type="button"
          label="Cancel"
        />
        <Button
          label="Upload"
          type="button"
          className="button upload"
          onClick={uploadHandler}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default FileUpload;
