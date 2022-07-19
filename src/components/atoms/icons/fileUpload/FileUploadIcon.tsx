import React from 'react';
import { ReactComponent as Upload } from './../../../../assets/upload.svg';

import './fileUploadIcon.css';

const FileUploadIcon: React.FC = () => {
  return <Upload className="uploadSvg" />;
};

export default FileUploadIcon;
