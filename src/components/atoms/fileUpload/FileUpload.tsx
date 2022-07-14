import { AxiosError } from 'axios';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileTypes } from '../../../common/acceptedFileTypes';
import { toastMessages } from '../../../common/messages';
import { ResponseErrorCode } from '../../../common/types';
import { convertSizeToMB, errorToast, successToast } from '../../../common/utility';
import fileManagementService from '../../../services/fileManagementService';
import { useAppSelector } from '../../../store/hooks';
import Button from '../button/Button';

import './fileUpload.css';

type FileUploadProps = {
  closePopUp: Dispatch<SetStateAction<boolean>>;
};

const FileUpload: React.FC<FileUploadProps> = ({ closePopUp }) => {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: uploadFileTypes,
    maxFiles: 1,
    maxSize: 52428800,
    multiple: false
  });

  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const files = acceptedFiles.map((file) => (
    <li className="fileUpload__fileList" key={file.name}>
      {file.name} - {convertSizeToMB(file.size)}
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li className="fileUpload__fileList" key={file.name}>
      <h4>Rejected:</h4>- {file.name}
      <ul>
        {errors.map((e) => (
          <li className="fileUpload__fileList-error" key={e.code}>
            Cant upload this type of file
          </li>
        ))}
      </ul>
    </li>
  ));

  const user = useAppSelector((state) => state.auth.userData);
  const currentFolder = useAppSelector((state) => state.fileManage.selectedFolder);

  const uploadHandler = async () => {
    setIsLoading(true);
    if (acceptedFiles.length !== 0) {
      try {
        const response = await fileManagementService.uploadFile(
          acceptedFiles,
          user?.id,
          currentFolder?.organization.id,
          currentFolder?.organization.name
        );
        if (response.status == 200) {
          successToast(toastMessages.successfulUpload);
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

  return (
    <div className="fileUpload">
      <h3 className="fileUpload__title">Chose a file to upload</h3>
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
