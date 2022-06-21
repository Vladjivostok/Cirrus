import React from 'react';
import { OnClickSvgProp } from '../../../../common/types';

import { ReactComponent as Folder } from '../../../../assets/folder.svg';
import './folder.css';

export const FolderIcon: React.FC<OnClickSvgProp> = ({ onClick, title }) => {
  return (
    <div className="folder">
      <Folder className="folder__icon" onClick={onClick} />
      <div className="folder__title">{title}</div>
    </div>
  );
};
