import React from 'react';

type InputType = 'text' | 'password';

type InputProps = {
  id: string;
  name: string;
  type: InputType;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ id, name, type, placeholder }) => {
  return <input id={id} name={name} type={type} placeholder={placeholder} />;
};

export default Input;
