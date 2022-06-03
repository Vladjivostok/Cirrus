import React from 'react';

import './button.css';

type Props = {
  disabled: boolean;
  label: string;
};

const Button: React.FC<Props> = ({ label, disabled }) => {
  return (
    <button className="button" disabled={disabled} type="submit">
      {label}
    </button>
  );
};

export default Button;
