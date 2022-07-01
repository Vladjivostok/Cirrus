import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AuthnService } from '../../../services/authnService';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import FormErrorMessage from '../../atoms/errorMessage/FormErrorMessage';
import { Hide, Show } from '../../atoms/icons/password/PasswordIcon';
import logo from './../../../assets/Cirrus.png';

import { successToast, errorToast } from '../../../common/utility';
import { yupValidation } from '../../../common/utility';

import { toastMessages } from '../../../common/messages';

import '../../../common/styles/formPages.css';
import { AxiosError } from 'axios';

const RegistrationScheme = Yup.object().shape({
  username: yupValidation.yupUsername,
  password: yupValidation.yupPasswordCreation,
  confirmPassword: yupValidation.yupConfirmPassword
});

const PasswordChangePage = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const togglePassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const toggleIcon = () => {
    if (!toggleShowPassword) {
      return <Hide onClick={togglePassword}></Hide>;
    } else if (toggleShowPassword) {
      return <Show onClick={togglePassword}></Show>;
    }
  };

  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegistrationScheme,
    onSubmit: async (values: {
      username: string;
      password: string;
      confirmPassword: string;
      token?: string;
    }) => {
      formik.setSubmitting(true);
      values.token = token;

      try {
        const response = await AuthnService.changePassword(values);
        if (response.status == 200) {
          successToast(toastMessages.successfulPasswordChange);
        }
      } catch (error) {
        let errCode = '';

        if (error instanceof AxiosError) {
          errCode = error.response?.data.message;
        }
        errorToast(errCode);
      }
      formik.resetForm();
      setToggleShowPassword(false);
      toggleIcon();
    }
  });

  return (
    <div className="formPage">
      <form className="form" onSubmit={formik.handleSubmit}>
        <img className="cirrusLogo" src={logo} alt="Cirrus logo missing" />
        <div className="inputWrapper">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="username" />
        </div>
        <div className="inputWrapper">
          <Input
            name="password"
            placeholder="Password"
            type={toggleShowPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="password" />
          {toggleIcon()}
        </div>
        <div className="inputWrapper">
          <Input
            name="confirmPassword"
            placeholder="Confirm password"
            type={toggleShowPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <FormErrorMessage
            errors={formik.errors}
            touched={formik.touched}
            inputType="confirmPassword"
          />
          {toggleIcon()}
        </div>
        <Button type="submit" className="button" disabled={formik.isSubmitting} label="Submit" />
      </form>
    </div>
  );
};

export default PasswordChangePage;
