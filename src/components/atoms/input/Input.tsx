import React from 'react';

type InputType = 'text' | 'password';

type InputProps = {
  name: string;
  type: InputType;
  placeholder: string;
  onChange: any;
  onBlur: any;
};

const Input: React.FC<InputProps> = ({ name, type, placeholder, onChange, onBlur }) => {
  return (
    <input name={name} type={type} placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
  );
};

export default Input;
