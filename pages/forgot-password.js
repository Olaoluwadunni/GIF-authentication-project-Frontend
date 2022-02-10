/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import { useState } from 'react';
import {
  Button, Container, Flex, Text, Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import InputBox from '../components/InputBox';
import passwordIcon from '../public/image 7.png';
import { baseUrl1 } from '../helpers/variables';

const forgotPassword = () => {
  const [email, setEmail] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register, handleSubmit, formState: {
      errors, isSubmitting,
    },
  } = useForm(formOptions);
  const sendCode = async (e) => {
    axios
      .post(`${baseUrl1}/forgot-password`, {
        email: e.email,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            router.push('/reset-password');
          }, 2000);
        }
        console.log(email, '****');
      }, (error) => {
        toast.error(error.response.data.message);
        console.log(error.response);
      });
  };
  return (
    <>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        <Image src={passwordIcon} alt="forgot password icon" width={80} height={80} />
        <Container>
          <Text fontSize="2xl" textAlign="center" marginTop="4" marginBottom="1" fontWeight="medium">Forgot Password?</Text>
          <Text fontSize="xm" textAlign="" marginBottom="6" className="fw-semibold" color="brand.100">Enter the email associated with your account and we will send an email with instructions to reset your password</Text>
          <form className="action" method="post" onSubmit={handleSubmit(sendCode)}>
            <div className="row g-2">
              <div className="mb-3">
                <InputBox
                  type="text"
                  id="email"
                  label="Email Address"
                  className="col-md-6"
                  value={email}
                  others={register('email')}
                  validate={errors.email ? 'is-invalid' : ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="text-danger mt-1">{errors.email?.message}</div>
              </div>
              <Button
                variant="solid"
                colorScheme="teal"
                className="col-12"
                w="100%"
                marginTop="5"
                type="submit"
                disabled={!email}
              >
                {isSubmitting ? <Spinner /> : (<Text> Send Mail</Text>)}
              </Button>
              <Text fontSize="sm" textAlign="center">
                <ArrowBackIcon />
                <Link href="/"> Back to log in</Link>
              </Text>
            </div>
          </form>
        </Container>
      </Flex>
      <Toaster />
    </>
  );
};

export default forgotPassword;
