import React from 'react';

import { OptionObjectProp } from '../../../common/types';

import './select.css';

interface SelectProps {
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  defaultValue: string;
  optionsArray: OptionObjectProp[];
  inputWrapperClassname: string;
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  defaultValue,
  onChange,
  optionsArray,
  inputWrapperClassname,
  placeholder
}) => {
  const options = optionsArray.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <>
      <div className={`inputWrapper-label ${inputWrapperClassname}`}>{placeholder}</div>
      <select defaultValue={defaultValue} onChange={onChange} name={name} className="select">
        {options}
      </select>
    </>
  );
};

export default Select;
