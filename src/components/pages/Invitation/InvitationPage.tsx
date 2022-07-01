import React from 'react';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { AxiosError } from 'axios';

import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import FormErrorMessage from '../../atoms/errorMessage/FormErrorMessage';
import Select from '../../atoms/select/Select';
import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

import { AuthnService } from '../../../services/authnService';

import { roles } from '../../../common/constants';
import { toastMessages } from '../../../common/messages';
import { yupValidation } from '../../../common/utility';
import { errorToast, successToast } from '../../../common/utility';

import logo from './../../../assets/Cirrus.png';
import '../../../common/styles/formPages.css';

const RegistraionScheme = Yup.object().shape({
  email: yupValidation.yupEmail
});

const InvitationPage = () => {
  const optionsArray = [
    { label: 'user', value: `${roles.user}` },
    { label: 'admin', value: `${roles.admin}` }
  ];

  // const optionsArray = [

  //   ['user', `${roles.user}`],

  //   ['admin', `${roles.admin}`]

  //   ];

  const formik = useFormik({
    initialValues: {
      email: '',
      role: roles.user
    },
    validationSchema: RegistraionScheme,
    onSubmit: async (values) => {
      formik.setSubmitting(true);

      try {
        const response = await AuthnService.inviteUser(values);

        if (response.status == 200) {
          successToast(toastMessages.successfulInvitation);
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

  return (
    <div className="formPage invitationContent">
      <form className="form" onSubmit={formik.handleSubmit}>
        <img className="cirrusLogo" src={logo} alt="Cirrus logo missing" />
        <div className="inputWrapper">
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="email" />
        </div>
        <div className="inputWrapper">
          <div className="inputWrapper-label">Pick a role</div>
          <Select
            defaultValue={formik.initialValues.role}
            name="role"
            onChange={formik.handleChange}
            optionsArray={optionsArray}
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="select" />
        </div>
        <Button className="button" type="submit" disabled={formik.isSubmitting} label="Submit" />
      </form>
      <BreadCrumbs />
    </div>
  );
};

export default InvitationPage;
