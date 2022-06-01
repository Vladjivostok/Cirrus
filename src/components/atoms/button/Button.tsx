import React from 'react';

type Props = {
  isDisabled: boolean;
  label: string;
};

const Button: React.FC<Props> = ({ isDisabled, label }) => {
  return (
    <button type="submit" disabled={isDisabled}>
      {label}
    </button>
  );
};

export default Button;
