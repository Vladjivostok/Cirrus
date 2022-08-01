import React from 'react';
import { FolderIconProps } from '../../../../common/types';

import { ReactComponent as Folder } from '../../../../assets/folder.svg';
import './folder.css';
import { folderTitleMaxLength, truncateString } from '../../../../common/utility';
import Tooltip from '@mui/material/Tooltip';

export const FolderIcon: React.FC<FolderIconProps> = ({ onClick, title, id, className }) => {
  const shortenedTitle = truncateString(title, folderTitleMaxLength);

  return (
    <Tooltip title={title} placement="right">
      <button
        type="button"
        className={className}
        id={JSON.stringify(id)}
        onClick={() => onClick(id)}>
        <Folder className="folder__icon" />
        <div className="folder__title">{shortenedTitle}</div>
      </button>
    </Tooltip>
  );
};
