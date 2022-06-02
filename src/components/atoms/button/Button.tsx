import React from 'react';

type Props = {
  disabled: boolean;
  label: string;
};

const Button: React.FC<Props> = ({ label, disabled }) => {
  return (
    <button disabled={disabled} type="submit">
      {label}
    </button>
  );
};

export default Button;
