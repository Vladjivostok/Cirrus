import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as UserGearSvg } from '../../../../assets/user-gear.svg';

import './userGear.css';

export const UserGearIcon: React.FC = () => {
  return (
    <Tooltip title="Admin">
      <UserGearSvg className="userGearIcon" />
    </Tooltip>
  );
};
