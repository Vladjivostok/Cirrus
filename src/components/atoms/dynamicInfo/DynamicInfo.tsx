import { Spinner } from '@chakra-ui/spinner';
import React from 'react';
import { ExecutionInfo } from '../../../common/types';
import IconButton from '@mui/material/IconButton';

import './dynamicInfo.css';
import codeExecutionService from '../../../services/codeExecutionService';
import {
  getCurrentDateAndTime,
  showToastError,
  transformDateAndTime
} from '../../../common/utility';
import Replay from '@mui/icons-material/Replay';

type DynamicInfoProps = {
  executionInfo: ExecutionInfo[] | undefined;
  setExecutionInfo: (value: React.SetStateAction<ExecutionInfo[]>) => void;
  setDisableRunButton: (value: React.SetStateAction<boolean>) => void;
  disableRunButton: boolean;
  currentFileId: number | undefined;
};

const DynamicInfo: React.FC<DynamicInfoProps> = ({
  executionInfo,
  setExecutionInfo,
  setDisableRunButton,
  disableRunButton,
  currentFileId
}) => {
  const rerunHandler = async (element: ExecutionInfo, i: number) => {
    if (executionInfo) {
      setDisableRunButton(true);
      setExecutionInfo(
        executionInfo.map((value, index) =>
          index === i
            ? {
                executionInfo: null,
                fileId: element.fileId,
                loading: true
              }
            : value
        )
      );
      codeExecutionService
        .userDemandExecute(
          element.fileId,
          element.executionInfo?.fileName,
          element.executionInfo?.organizationId,
          element.executionInfo?.organizationName
        )
        .then((response) => {
          const executeTime = getCurrentDateAndTime();

          setExecutionInfo(
            executionInfo.map((value, index) =>
              index === i
                ? {
                    executionInfo: {
                      fileName: element.executionInfo?.fileName,
                      organizationId: element.executionInfo?.organizationId,
                      organizationName: element.executionInfo?.organizationName,
                      response: JSON.stringify(response),
                      time: transformDateAndTime(executeTime, true)
                    },
                    fileId: element.fileId,
                    loading: false
                  }
                : value
            )
          );
          setDisableRunButton(false);
        })
        .catch((error) => {
          setExecutionInfo((oldArray) => oldArray.filter((_, index) => index !== i));
          setDisableRunButton(false);
          showToastError(error);
        });
    }
  };

  const makeKey = (i: number, id: number | undefined) => {
    return JSON.stringify(i) + JSON.stringify(id);
  };

  return (
    <div className="dynamic-info">
      {executionInfo?.map((element, i) => (
        <div key={makeKey(i, element.fileId)} className="dynamic-info__container-wrapper">
          {element.loading && currentFileId === element.fileId ? (
            <Spinner boxSize={30}></Spinner>
          ) : (
            currentFileId === element.fileId && (
              <div className="dynamic-info__container">
                <IconButton
                  sx={{
                    marginBottom: 1,
                    marginTop: 0.5
                  }}
                  disabled={disableRunButton}
                  onClick={async () => {
                    rerunHandler(element, i);
                  }}>
                  <Replay />
                </IconButton>
                <p className="dynamic-info__organization-name">
                  -Organization:
                  <span className="dynamic-info__name-spans">
                    {' '}
                    {element.executionInfo?.organizationName}
                  </span>
                </p>
                <p className="dynamic-info__file-name">
                  -File name:{' '}
                  <span className="dynamic-info__name-spans">
                    {element.executionInfo?.fileName}
                  </span>
                </p>
                <p className="dynamic-info__timestamp">
                  -Timestamp:{' '}
                  <span className="dynamic-info__name-spans"> {element.executionInfo?.time}</span>
                </p>
                <div className="dynamic-info__code-response">
                  <code>{element.executionInfo?.response}</code>
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInfo;
