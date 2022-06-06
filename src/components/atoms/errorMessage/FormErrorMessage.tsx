import React from 'react';

import './formErrorMessage.css';

type FormErrorMessageProps = {
  children: string;
};

const FormErrorMessage = (props: FormErrorMessageProps) => {
  return <div className="errorMsg">{props.children}</div>;
};

export default FormErrorMessage;
