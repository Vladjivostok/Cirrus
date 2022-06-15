import React from 'react';

import './formErrorMessage.css';

type FormErrorMessageProps = {
  children: string | undefined;
};

const FormErrorMessage = (props: FormErrorMessageProps) => {
  return <div className="errorMsg">{props.children}</div>;
};

export default FormErrorMessage;