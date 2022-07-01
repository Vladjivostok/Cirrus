import React, { ChangeEventHandler } from 'react';

import './input.css';

type InputType = 'text' | 'password' | 'email' | 'select';

interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  type: InputType;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ value, name, type, placeholder, onChange }) => {
  return (
    <input
      className="input"
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
