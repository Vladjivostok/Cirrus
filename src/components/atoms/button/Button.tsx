import React from 'react';

import { MouseEventHandler } from 'react';

import './button.css';

type ButtonTypes = 'submit' | 'button' | 'reset';

interface ButtonProps {
  disabled: boolean;
  label: string;
  type: ButtonTypes;
  className: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ label, disabled, type, className, onClick }) => {
  return (
    <button className={className} disabled={disabled} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
