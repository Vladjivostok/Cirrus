import React from 'react';
import { string } from 'yup';

type Props = {
  value: 'text';
  onChange: any;
  name: string;
  type: 'text' | 'password';
  placeholder: string;
};

const Input: React.FC<Props> = ({ value, name, type, placeholder, onChange }) => {
  return (
    <input value={value} name={name} type={type} placeholder={placeholder} onChange={onChange} />
  );
};

export default Input;
