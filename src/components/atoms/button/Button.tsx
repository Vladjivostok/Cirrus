import React from 'react';

import './button.css';

type ButtonTypes = 'submit' | 'button' | 'reset';

interface ButtonProps {
  disabled: boolean;
  label: string;
  type: ButtonTypes;
}

const Button: React.FC<ButtonProps> = ({ label, disabled, type }) => {
  return (
    <button className="button" disabled={disabled} type={type}>
      {label}
    </button>
  );
};

export default Button;
