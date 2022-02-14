/* eslint-disable react/jsx-filename-extension */
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
import { baseUrl1 } from '../helpers/variables';

const changePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().max(6, 'Old password must be at most 6 characters').required('Password is required').matches(
      /([a-zA-Z]{4})([0-9]{1})([!@$%^&#*]{1})$/,
      'Password must Contain 4 Characters, One Number and one special case Character',
    ),
    newPassword: Yup.string().max(6, 'New password must be at most 6 characters').required('Password is required').matches(
      /([a-zA-Z]{4})([0-9]{1})([!@$%^&#*]{1})$/,
      'Password must Contain 4 Characters, One Number and one special case Character',
    ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register, handleSubmit, formState: {
      errors, isSubmitting,
    },
  } = useForm(formOptions);

  const changeMyPassword = async (e) => {
    console.log('potato');
    const token = localStorage.getItem('token');
    const config = {
      headers: { 'x-access-token': token },
    };
    return axios
      .put(`${baseUrl1}/change-password`, {
        old_password: e.oldPassword,
        new_password: e.newPassword,
        confirm_password: e.confirmPassword,
      }, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          router.push('/search-gif');
        }
        console.log(newPassword);
      }, (error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <div>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        <Container>
          <Text fontSize="2xl" textAlign="center" marginBottom="1" fontWeight="medium">Change Password</Text>
          <Text fontSize="xm" textAlign="center" marginBottom="8" className="fw-semibold" color="brand.100">Enter your old password, your new password and confirm it.</Text>
          <form className="action" method="post" onSubmit={handleSubmit(changeMyPassword)}>
            <div className="row g-2">
              <div className="mb-3">
                <PasswordInput
                  label="Old Password"
                  value={oldPassword}
                  id="password"
                  validate={errors.password ? 'is-invalid' : ''}
                  others={register('oldPassword')}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.oldPassword?.message}</div>
              </div>
              <div className="mb-3">
                <PasswordInput
                  label="New Password"
                  value={newPassword}
                  id="password"
                  validate={errors.password ? 'is-invalid' : ''}
                  others={register('newPassword')}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.newPassword?.message}</div>
              </div>
              <div className="mb-3">
                <PasswordInput
                  label="Confirm New Password"
                  value={confirmNewPassword}
                  id="confirmNewPassword"
                  validate={errors.confirmNewPassword ? 'is-invalid' : ''}
                  others={register('passwordConfirmation')}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                disabled={!oldPassword || !newPassword || !confirmNewPassword}
              >
                {isSubmitting ? <Spinner /> : (<Text> Change Password</Text>)}
              </Button>
            </div>
          </form>
        </Container>
        <Toaster />
      </Flex>
    </div>
  );
};

export default changePassword;
