/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Button, Container, Flex, Spinner, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';
import { baseUrl1 } from '../helpers/variables';
// import AuthService from '../services/auth';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().max(6).required('Password is required'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(formOptions);

  const signIn = async (e) => {
    console.log(email, password);
    // e.preventDefault();
    return axios
      .post(`${baseUrl1}/login`, {
        email: e.email,
        password: e.password,
      })
      .then(
        (response) => {
          console.log(response);
          const returnUrl = router.query.returnUrl || '/search-gif';
          const { token } = response.data;
          const decoded = jwt_decode(token);
          localStorage.setItem('adminToken', decoded.role);
          localStorage.setItem('token', token);
          console.log(decoded);
          if (response.status === 200) {
            console.log(response.data.message);
            toast.success(response.data.message);
            setTimeout(() => {
              router.push(returnUrl);
            }, 2500);
            // router.push(returnUrl);
          }
        },
        (error) => {
          // alert(error.response.data.message);
          toast.error(error.response.data.message);
          console.log(error);
        },
      );
  };

  return (
    <Flex direction="column" justify="center" align="center" minH="100vh">
      <Container>
        <Text
          fontSize="xl"
          textAlign="center"
          marginBottom="10"
          className="fst-italic"
        >
          Log In
        </Text>
        <form className="col-12" onSubmit={handleSubmit(signIn)}>
          <div className="mb-3">
            <InputBox
              type="email"
              id="email"
              label="Email Address"
              validate={errors.email ? 'is-invalid' : ''}
              value={email}
              others={register('email')}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="text-danger mt-1">{errors.email?.message}</div>
          </div>
          <div>
            <PasswordInput
              label="Password"
              value={password}
              validate={errors.password ? 'is-invalid' : ''}
              others={register('password')}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-danger mt-1">{errors.password?.message}</div>
          </div>
          <div>
            <Button
              variant="solid"
              colorScheme="teal"
              className="col-12"
              w="100%"
              marginTop="5"
              type="submit"
              disabled={!email || !password}
            >
              {isSubmitting ? <Spinner /> : (<Text>Sign In</Text>)}
            </Button>
            <div
              fontSize="xl"
              className="d-flex justify-content-between fst-italic mt-2"
            >
              <Text fontSize="sm">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account yet?
                <Link href="/sign-up">Sign Up</Link>
              </Text>
              <Text fontSize="sm" className="cursor-pointer">
                <Link href="/forgot-password" class="text-decoration-none">
                  Forgot Password?
                </Link>
              </Text>
            </div>
          </div>
        </form>
      </Container>
      <Toaster />
    </Flex>
  );
}

export default Home;
