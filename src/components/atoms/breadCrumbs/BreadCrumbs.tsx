import React from 'react';

import { useLocation } from 'react-router-dom';
import LocationCheck from '../locationCheck/LocationCheck';

import './breadCrumbs.css';

const BreadCrumbs = () => {
  const location = useLocation();

  const path = LocationCheck(location);

  return (
    <div className="breadCrumbs">
      <h1>{path}</h1>
    </div>
  );
};

export default BreadCrumbs;
