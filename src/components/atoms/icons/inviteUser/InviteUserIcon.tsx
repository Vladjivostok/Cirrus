import React from 'react';

import { ReactComponent as InviteUser } from './../../../../assets/user-plus.svg';
import { OnClickSvgProp } from '../../../../common/types';

import './inviteUserIcon.css';

export const InviteUserIcon: React.FC<OnClickSvgProp> = ({ onClick }) => {
  return <InviteUser onClick={onClick} className="inviteUser" />;
};
