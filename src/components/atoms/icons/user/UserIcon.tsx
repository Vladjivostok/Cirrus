import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as UserSvg } from '../../../../assets/user.svg';

import './user.css';

export const UserIcon: React.FC = () => {
  return (
    <Tooltip title="User">
      <UserSvg className="userIcon" />
    </Tooltip>
  );
};
