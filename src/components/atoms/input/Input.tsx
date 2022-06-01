import React from 'react';

type InputType = 'text' | 'password';

type InputProps = {
  name: string;
  type: InputType;
  placeholder: string;
  onChange: any;
};

const Input: React.FC<InputProps> = ({ name, type, placeholder, onChange }) => {
  return <input name={name} type={type} placeholder={placeholder} onChange={onChange} />;
};

export default Input;
