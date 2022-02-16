/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import { useState } from 'react';
import {
  Button, Container, Flex, Text, Spinner, Select,
} from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';
import { baseUrl1 } from '../helpers/variables';

const registerAdmin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().max(11).required('Phone number is required'),
    email: Yup.string().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
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
  // const { isSubmitting } = formState;
  const signUp = async (e) => {
    console.log(firstName, lastName);
    const token = localStorage.getItem('token');
    const headers = {
      'x-access-token': token,
    };
    // console.log(gender)
    return axios
      .post(`${baseUrl1}/admin/register`, {
        first_name: e.firstName,
        last_name: e.lastName,
        email: e.email,
        phone_number: Number(e.phoneNumber),
        gender: gender,
        password: e.password,
        confirm_password: e.confirmPassword,
      }, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success(response.data.message);
          router.push('/');
        }
        console.log(firstName, lastName);
      }, (error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        <Container>
          <Text fontSize="2xl" textAlign="center" fontWeight="semibold" marginBottom="1" className="fst-italic">Welcome, Super Admin</Text>
          <Text fontSize="xm" textAlign="center" marginBottom="7" className="fw-semibold" color="brand.100">Create an account for an admin here</Text>
          <form className="action" method="post" onSubmit={handleSubmit(signUp)}>
            <div className="row">
              <div className="mb-3 col-12 col-md-6">
                <InputBox
                  type="text"
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  className="col-6"
                  others={register('firstName')}
                  validate={errors.firstName ? 'is-invalid' : ''}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.firstName?.message}</div>
              </div>
              <div className="mb-3 col-12 col-md-6">
                <InputBox
                  type="text"
                  id="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  className="col-6"
                  others={register('lastName')}
                  validate={errors.lastName ? 'is-invalid' : ''}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.lastName?.message}</div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-md-6">
                <InputBox
                  type="email"
                  id="email"
                  label="Email Address"
                  placeholder="johndoe@email.com"
                  value={email}
                  others={register('email')}
                  validate={errors.email ? 'is-invalid' : ''}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.email?.message}</div>
              </div>
              <div className="mb-3 col-12 col-md-6">
                <InputBox
                  type="number"
                  id="phoneNumber"
                  placeholder="08023456789"
                  label="Phone Number"
                  others={register('phoneNumber')}
                  value={phoneNumber}
                  validate={errors.phone_number ? 'is-invalid' : ''}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.phoneNumber?.message}</div>
              </div>
            </div>
            <Select
              placeholder="Select your gender"
              name="gender"
              id="gender"
              {...register('gender')}
              className="mt-1 mb-3"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <div className="row">
              <div className="mb-3 col-12 col-md-6">
                <PasswordInput
                  value={password}
                  id="password"
                  label="Password"
                  others={register('password')}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.password?.message}</div>
              </div>
              <div className="mb-3 col-12 col-md-6">
                <PasswordInput
                  label="Confirm Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  others={register('passwordConfirmation')}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.passwordConfirmation?.message}</div>
              </div>
            </div>
            <Button
              variant="solid"
              colorScheme="teal"
              className="col-12 col-md-6"
              w="100%"
              marginTop="5"
              type="submit"
              disabled={!email || !password || !phoneNumber
            || !confirmPassword || !firstName || !lastName}
            >
              {isSubmitting ? <Spinner /> : (<Text> Sign Up</Text>)}

            </Button>
            <Text fontSize="sm" textAlign="center">
              Already have an account?
              <Link href="/"> Sign In</Link>
            </Text>
          </form>
        </Container>
      </Flex>
      <Toaster />
    </>
  );
};

export default registerAdmin;
