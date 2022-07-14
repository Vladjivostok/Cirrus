import React from 'react';
import { FolderIconProps } from '../../../../common/types';

import { ReactComponent as Folder } from '../../../../assets/folder.svg';
import './folder.css';

export const FolderIcon: React.FC<FolderIconProps> = ({ onClick, title, id, className }) => {
  return (
    <button className={className} id={JSON.stringify(id)} onClick={onClick}>
      <Folder className="folder__icon" />
      <div className="folder__title">{title}</div>
    </button>
  );
};
