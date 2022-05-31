import React, { useState } from 'react';

import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';

const Form: React.FC = () => {
  const [inputValues, setInputValues] = useState({ username: '', password: '' });

  const [usernameError, setUsernameError] = useState({
    isShown: false,
    message: 'Username input cant be empty!'
  });

  const [passwordError, setPasswordError] = useState({
    isShown: false,
    message: 'Password input cant be empty!'
  });

  const onChangeHandler = (e: any) => {
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log(inputValues);
  };

  const validateInput = (event: any) => {
    switch (event.target.name) {
      case 'username':
        setUsernameError((prevError) => ({
          ...prevError,
          isShown: false
        }));
        if (event.target.value == '') {
          setUsernameError((prevError) => ({
            ...prevError,
            isShown: true
          }));
        }
        break;
      case 'password':
        setPasswordError((prevError) => ({
          ...prevError,
          isShown: false
        }));
        if (event.target.value == '') {
          setPasswordError((prevError) => ({
            ...prevError,
            isShown: true
          }));
        }
        break;

      default:
        break;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name={'username'}
        type={'text'}
        placeholder={'Username'}
        onChange={onChangeHandler}
        onBlur={validateInput}
      />
      {usernameError.isShown && <p>{usernameError.message}</p>}
      <Input
        name={'password'}
        type={'password'}
        placeholder={'Password'}
        onChange={onChangeHandler}
        onBlur={validateInput}
      />
      {passwordError.isShown && <p>{passwordError.message}</p>}
      <Button />
    </form>
  );
};

export default Form;
