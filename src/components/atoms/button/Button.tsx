import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

import { MouseEventHandler } from 'react';

import './button.css';

type ButtonTypes = 'submit' | 'button' | 'reset';

interface ButtonProps {
  disabled?: boolean;
  label: string;
  type: ButtonTypes;
  className: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, disabled, type, className, onClick, loading }) => {
  return (
    <button className={className} disabled={disabled} type={type} onClick={onClick}>
      <div className="button__spinner-wrapper">
        {loading && <Spinner boxSize={14} className="button__spinner" />}
      </div>
      {label}
    </button>
  );
};

export default Button;
