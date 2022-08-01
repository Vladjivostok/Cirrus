import React from 'react';

import Tooltip from '@mui/material/Tooltip';

import { ReactComponent as PythonFile } from './../../../../assets/python.svg';
import { ReactComponent as TextFile } from './../../../../assets/file-text.svg';
import { ReactComponent as WordFile } from './../../../../assets/word.svg';
import { ReactComponent as PowerPointFile } from './../../../../assets/powerpoint.svg';
import { ReactComponent as ExcelFile } from './../../../../assets/excel.svg';

import './fileIcons.css';

type FileIconsProps = {
  fileExtension: string;
};

export const FileIcons: React.FC<FileIconsProps> = ({ fileExtension }) => {
  let icon = <></>;
  if (fileExtension === '.py') {
    icon = (
      <Tooltip title="Python" placement="top">
        <PythonFile className="file-icons" />
      </Tooltip>
    );
  }

  if (fileExtension === '.txt') {
    icon = (
      <Tooltip title="Text File" placement="top">
        <TextFile className="file-icons file-icons--blue" />
      </Tooltip>
    );
  }

  if (fileExtension === '.doc' || fileExtension === '.docx') {
    icon = (
      <Tooltip title="Microsoft Word" placement="top">
        <WordFile className="file-icons" />
      </Tooltip>
    );
  }

  if (fileExtension === '.pptx' || fileExtension === '.ppt') {
    icon = (
      <Tooltip title="Microsoft Word" placement="top">
        <PowerPointFile className="file-icons" />
      </Tooltip>
    );
  }

  if (fileExtension === '.xls' || fileExtension === '.xlsx') {
    icon = (
      <Tooltip title="Microsoft Excel" placement="top">
        <ExcelFile className="file-icons" />
      </Tooltip>
    );
  }

  return icon;
};
