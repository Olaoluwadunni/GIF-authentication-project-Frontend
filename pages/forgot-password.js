/* eslint-disable react/jsx-filename-extension */
import { useState } from 'react';
import {
  Button, Container, Flex, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowBackIcon } from '@chakra-ui/icons';
import InputBox from '../components/InputBox';
import passwordIcon from '../public/image 7.png';

const forgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <div>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        <Image src={passwordIcon} alt="forgot password icon" width={80} height={80} />
        <Container>
          <Text fontSize="2xl" textAlign="center" marginTop="4" marginBottom="1" fontWeight="medium">Forgot Password?</Text>
          <Text fontSize="xm" textAlign="" marginBottom="6" className="fw-semibold" color="brand.100">Enter the email associated with your account and we will send an email with instructions to reset your password</Text>
          <form className="action" method="post">
            <div className="row g-2">
              <div className="mb-3">
                <InputBox
                  type="text"
                  id="email"
                  label="Email Address"
                  className="col-md-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <div className="text-danger mt-1">{errors.name?.message}</div> */}
              </div>
              <Button
                variant="solid"
                colorScheme="teal"
                className="col-12"
                w="100%"
                marginTop="5"
                type="submit"
                // disabled={!email || !password || !phoneNumber || !confirmPassword || !name}
                // disabled={isSubmitting || !isDirty}
              >
                {/* {isSubmitting ? <Spinner /> : (<Text> Sign Up</Text>)} */}
                Submit
              </Button>
              <Text fontSize="sm" textAlign="center">
                <ArrowBackIcon />
                <Link href="/"> Back to log in</Link>
              </Text>
            </div>
          </form>
        </Container>
      </Flex>
    </div>
  );
};

export default forgotPassword;
