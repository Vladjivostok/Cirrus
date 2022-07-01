import React from 'react';

import { OptionObjectProp } from '../../../common/types';

import './select.css';

interface SelectProps {
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  defaultValue: string;
  optionsArray: OptionObjectProp[];
}

const Select: React.FC<SelectProps> = ({ name, defaultValue, onChange, optionsArray }) => {
  const options = optionsArray.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <select defaultValue={defaultValue} onChange={onChange} name={name} className="select">
      {options}
    </select>
  );
};

export default Select;
