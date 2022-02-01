/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import { useState } from 'react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Button, Container, Flex, Text,
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

const registerUser = () => {
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const notify = () => toast('Here is your toast.');

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().max(11).required('Phone number is required'),
    password: Yup.string().max(6).required('Password is required').matches(
      /([a-zA-Z]{4})([0-9]{1})([!@$%^&#*]{1})$/,
      'Password must Contain 4 Characters, One Number and one special case Character',
    ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const signUp = async () => {
    axios.post(`${baseUrl1}/register`, {
      name: name,
      email: email,
      phone_number: phoneNumber,
      password: password,
      confirm_password: confirmPassword,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success(response.data.data.message);
          router.push('/');
        }
        console.log(name);
      }, (error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <>
      <Link href="/">
        <a>
          <ArrowLeftIcon marginTop="6" marginLeft="5" textAlign="start" />
        </a>
      </Link>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        <Container>
          <Text fontSize="xl" textAlign="center" marginBottom="10" className="fst-italic">Sign Up</Text>
          <form className="action" method="post" onSubmit={handleSubmit(signUp)}>
            <div className="row g-2">
              <div className="mb-3">
                <InputBox
                  type="text"
                  id="name"
                  label="Name"
                  className="col-md-6"
                  others={register('name')}
                  // validate={errors.name ? 'is-invalid' : ''}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.name?.message}</div>
              </div>
              <div className="mb-3">
                <InputBox
                  type="email"
                  id="email"
                  label="Email Address"
                  value={email}
                  others={register('email')}
                  // validate={errors.email ? 'is-invalid' : ''}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.email?.message}</div>
              </div>
              <div className="mb-3">
                <InputBox
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  others={register('phoneNumber')}
                  value={phoneNumber}
                  // validate={errors.phone_number ? 'is-invalid' : ''}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.phoneNumber?.message}</div>
              </div>
              <div className="mb-3">
                <PasswordInput
                  value={password}
                  id="password"
                  label="Password"
                  others={register('password')}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="text-danger mt-1">{errors.password?.message}</div>
              </div>
              <div className="mb-3">
                <PasswordInput
                  label="Confirm Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  others={register('passwordConfirmation')}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={!email || !password || !phoneNumber || !confirmPassword || !name}
              >
                Sign Up

              </Button>
              <Text fontSize="sm" textAlign="center">
                Already have an account?
                <Link href="/"> Sign In</Link>
              </Text>
            </div>
          </form>
        </Container>
      </Flex>
      <Toaster />
    </>
  );
};
export default registerUser;
