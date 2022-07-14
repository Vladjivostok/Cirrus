import React, { MouseEventHandler } from 'react';
import { ReactComponent as Close } from '../../../../assets/close.svg';
import './close.css';

type CloseIconProps = {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
};

export const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <Close className="closeIcon" />
    </div>
  );
};
