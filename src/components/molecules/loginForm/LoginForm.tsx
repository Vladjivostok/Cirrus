import React from 'react';

import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

import logo from './../../../assets/Cirrus.png';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import './loginForm.css';

const LoginSceme = Yup.object().shape({
  username: Yup.string().required('Username required!'),
  password: Yup.string().required('Password required!')
});

const LoginForm: React.FC = () => {
  return (
    <div className="loginFormContainer">
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSceme}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          //submit logic

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ errors, values, isSubmitting, handleSubmit, touched }) => (
          <Form className="loginForm" onSubmit={handleSubmit}>
            <img src={logo} alt="Cirrus logo missing" />
            <div className="inputWrapper">
              <Field
                name="username"
                placeholder={'Username'}
                type={'text'}
                value={values.username}
                as={Input}
              />
              {errors.username && touched.username ? (
                <p className="errorMsg">{errors.username}</p>
              ) : null}
            </div>
            <div className="inputWrapper">
              <Field
                name="password"
                placeholder={'Password'}
                type={'password'}
                value={values.password}
                as={Input}
              />
              {errors.password && touched.password ? (
                <p className="errorMsg">{errors.password}</p>
              ) : null}
            </div>

            <Button disabled={isSubmitting} label={'Login'} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
