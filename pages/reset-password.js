/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import {
  Button, Container, Flex, Text, Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import router from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import PasswordInput from '../components/PasswordInput';
import InputBox from '../components/InputBox';
import { baseUrl1 } from '../helpers/variables';

const resetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');
  const [resetCode, setResetCode] = useState('');

  const validationSchema = Yup.object().shape({
    pin: Yup.string().max(7).required('Reset Pin is required'),
    password: Yup.string().max(6).required('Password is required').matches(
      /([a-zA-Z]{4})([0-9]{1})([!@$%^&#*]{1})$/,
      'Password must Contain 4 Characters, One Number and one special case Character',
    ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register, handleSubmit, formState: {
      errors, isSubmitting,
    },
  } = useForm(formOptions);

  const resetMyPassword = async (e) => {
    console.log('ghana jollof');
    return axios
      .post(`${baseUrl1}/reset-password`, {
        reset_code: e.resetCode,
        password: e.newPassword,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          router.push('/');
        }
      }, (error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <div>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        <Container>
          <Text fontSize="2xl" textAlign="center" marginBottom="1" fontWeight="medium">Reset Password</Text>
          <Text fontSize="xm" textAlign="" marginBottom="8" className="fw-semibold" color="brand.100">Enter the code that was sent to your email, your new password and confirm it.</Text>
          <form className="action" method="post" onSubmit={handleSubmit(resetMyPassword)}>
            <div className="row g-2">
              <div className="mb-3">
                <InputBox
                  type="text"
                  id="email"
                  label="Reset Code"
                  className="col-md-6"
                  value={resetCode}
                  others={register('resetCode')}
                  // validate={errors.resetCode ? 'is-invalid' : ''}
                  onChange={(e) => setResetCode(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.resetCode?.message}</div>
              </div>
              <div className="mb-3">
                <PasswordInput
                  label="New Password"
                  value={newPassword}
                  id="password"
                  // validate={errors.newPassword ? 'is-invalid' : ''}
                  others={register('password')}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.password?.message}</div>
              </div>
              <div className="mb-3">
                <PasswordInput
                  label="Confirm New Password"
                  value={confirmNewPassword}
                  id="confirmNewPassword"
                  // validate={errors.confirmNewPassword ? 'is-invalid' : ''}
                  others={register('confirmNewPassword')}
                  onChange={(e) => setconfirmNewPassword(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.passwordConfirmation?.message}</div>
              </div>
              <Button
                variant="solid"
                colorScheme="teal"
                className="col-12"
                w="100%"
                marginTop="5"
                type="submit"
                disabled={!resetCode || !newPassword || !confirmNewPassword}
              >
                {isSubmitting ? <Spinner /> : (<Text> Reset Password</Text>)}
              </Button>
            </div>
          </form>
        </Container>
        <Toaster />
      </Flex>
    </div>
  );
};

export default resetPassword;
