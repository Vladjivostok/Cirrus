import React from 'react';

import { ReactComponent as Delete } from './../../../../assets/bin.svg';
import { OnClickSvgProp } from '../../../../common/types';

import './deleteIcon.css';

export const DeleteIcon: React.FC<OnClickSvgProp> = ({ onClick }) => {
  return <Delete onClick={onClick} className="delete" />;
};
