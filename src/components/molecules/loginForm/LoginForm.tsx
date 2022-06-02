import React from 'react';
import { Formik, Field, Form } from 'formik';

import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import * as Yup from 'yup';

const LoginSceme = Yup.object().shape({
  username: Yup.string().required('Username required!'),
  password: Yup.string().required('Password required!')
});

const LoginForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSceme}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        console.log(data);

        setSubmitting(false);
        resetForm();
      }}
    >
      {({ errors, values, isSubmitting, handleSubmit, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="username"
            placeholder={'Username'}
            type={'text'}
            value={values.username}
            as={Input}
          />
          {errors.username && touched.username ? <div>{errors.username}</div> : null}
          <Field
            name="password"
            placeholder={'Password'}
            type={'password'}
            value={values.password}
            as={Input}
          />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <Button disabled={isSubmitting} label={'Login'} />
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
