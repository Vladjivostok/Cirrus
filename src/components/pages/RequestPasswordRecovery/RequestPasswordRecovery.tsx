import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { errorToast, successToast } from '../../../common/utility';
import { AxiosError } from 'axios';
import { AuthnService } from '../../../services/authnService';
import { useNavigate } from 'react-router-dom';

import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import FormErrorMessage from '../../atoms/errorMessage/FormErrorMessage';
import logo from './../../../assets/Cirrus.png';
import { toastMessages } from '../../../common/messages';

import '../../../common/styles/formPages.css';
import { useAppSelector } from '../../../store/hooks';

const RegistraionScheme = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email format').required('Email required')
});

const RequestPasswordRecovery: React.FC = () => {
  const { user, isLoading, isError } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: RegistraionScheme,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      try {
        const response = await AuthnService.requestPasswordRecovery(values);
        if (response.status == 200) {
          successToast(toastMessages.successfulEmailSent);
          navigate('/login');
        }
      } catch (error) {
        let errCode = '';
        if (error instanceof AxiosError) {
          errCode = error.response?.data.message;
        }
        errorToast(errCode);
      }
      formik.resetForm();
    }
  });

  useEffect(() => {
    if (user?.accessToken && !isLoading && !isError) {
      navigate('/dashboard', { replace: true });
    }
  }, [user?.accessToken]);

  return (
    <div className="formPage">
      <form className="form" onSubmit={formik.handleSubmit}>
        <img className="cirrusLogo" src={logo} alt="Cirrus logo missing" />
        <div className="inputWrapper">
          <Input
            name="email"
            placeholder="Please enter your email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="email" />
        </div>
        <Button type="submit" className="button" disabled={formik.isSubmitting} label="Submit" />
      </form>
    </div>
  );
};

export default RequestPasswordRecovery;
