import React from 'react';

import sadFace from '../../../assets/SadFace.png';

import './pageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="errorWrapper">
      <img className="sadFace" src={sadFace} alt="SadFace" />
      <h1>Error 404</h1>
      <h5>Page Not Found</h5>
    </div>
  );
};

export default PageNotFound;
