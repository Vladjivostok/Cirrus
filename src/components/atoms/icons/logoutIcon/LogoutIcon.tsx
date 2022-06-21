import React from 'react';

import { ReactComponent as Exit } from './../../../../assets/exit.svg';

import './logoutIcon.css';

type LogoutProps = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export const LogoutIcon: React.FC<LogoutProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <Exit className="exit"></Exit>
    </div>
  );
};
