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

  const [isValid, setIsValid] = useState({ username: false, password: false });
  const [isBtnDisable, setIsBtnDisabled] = useState(true);

  const onChangeHandler = (event: any) => {
    if (event.target.name == 'username') {
      validateUsername(event);
    } else if (event.target.name == 'password') {
      validatePassword(event);
    }

    if (isValid.username == true && isValid.password == true) {
      setIsBtnDisabled(false);
    } else if (isValid.username == false || isValid.password == false) {
      setIsBtnDisabled(true);
    }

    setInputValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log(inputValues);
  };

  const validateUsername = (event: any) => {
    if (event.target.value == '') {
      setUsernameError((prevError) => ({
        ...prevError,
        isShown: true
      }));
      setIsValid((prevValue) => ({
        ...prevValue,
        username: false
      }));
    } else {
      setUsernameError((prevError) => ({
        ...prevError,
        isShown: false
      }));
      setIsValid((prevValue) => ({
        ...prevValue,
        username: true
      }));
    }
  };

  const validatePassword = (event: any) => {
    if (event.target.value == '') {
      setPasswordError((prevError) => ({
        ...prevError,
        isShown: true
      }));
      setIsValid((prevValue) => ({
        ...prevValue,
        password: false
      }));
    } else {
      setPasswordError((prevError) => ({
        ...prevError,
        isShown: false
      }));
      setIsValid((prevValue) => ({
        ...prevValue,
        password: true
      }));
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Input name={'username'} type={'text'} placeholder={'Username'} onChange={onChangeHandler} />
      {usernameError.isShown && <p>{usernameError.message}</p>}
      <Input
        name={'password'}
        type={'password'}
        placeholder={'Password'}
        onChange={onChangeHandler}
      />
      {passwordError.isShown && <p>{passwordError.message}</p>}
      <Button isDisabled={isBtnDisable} label={'Log In'} />
    </form>
  );
};

export default Form;
