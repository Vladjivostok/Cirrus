import React from 'react';
import { FolderIconProps } from '../../../../common/types';

import { ReactComponent as Folder } from '../../../../assets/folder.svg';
import './folder.css';
import { folderTitleMaxLength, truncateString } from '../../../../common/utility';

export const FolderIcon: React.FC<FolderIconProps> = ({ onClick, title, id, className }) => {
  const shortenedTitle = truncateString(title, folderTitleMaxLength);

  return (
    <button className={className} id={JSON.stringify(id)} onClick={() => onClick(id)} title={title}>
      <Folder className="folder__icon" />
      <div className="folder__title">{shortenedTitle}</div>
    </button>
  );
};
