import React from 'react';

import { ReactComponent as Eye } from './../../../assets/eye.svg';
import { ReactComponent as EyeBlocked } from './../../../assets/eye-blocked.svg';

import './svg.css';

type ShowHideProps = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export const Show: React.FC<ShowHideProps> = ({ onClick }) => {
  return (
    <div className="showHideIcon" onClick={onClick}>
      <Eye />
    </div>
  );
};

export const Hide: React.FC<ShowHideProps> = ({ onClick }) => {
  return (
    <div className="showHideIcon" onClick={onClick}>
      <EyeBlocked />
    </div>
  );
};
