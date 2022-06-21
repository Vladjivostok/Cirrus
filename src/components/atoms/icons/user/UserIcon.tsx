import React from 'react';

import { ReactComponent as UserSvg } from '../../../../assets/user-circle.svg';

import './user.css';

export const UserIcon: React.FC = () => {
  return <UserSvg className="userIcon" />;
};
