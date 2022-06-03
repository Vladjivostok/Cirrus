import React, { ChangeEventHandler } from 'react';

import './input.css';

type Props = {
  value: 'text';
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  type: 'text' | 'password';
  placeholder: string;
};

const Input: React.FC<Props> = ({ value, name, type, placeholder, onChange }) => {
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
