import React, { ChangeEventHandler } from 'react';

import './input.css';

type InputType = 'text' | 'password' | 'email' | 'select';

interface InputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  type: InputType;
  placeholder?: string;
  className?: string;
  inputWrapperClassname?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  name,
  type,
  placeholder,
  className,
  inputWrapperClassname,

  onChange
}) => {
  return (
    <>
      <div className={`inputWrapper-label ${inputWrapperClassname}`}>{placeholder}</div>
      <input
        className={`input ${className}`}
        value={value}
        name={name}
        type={type}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
