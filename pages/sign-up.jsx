import React from 'react';
import {
  Button, Container, Flex, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';

const register = () => (
  <Flex direction="column" justify="center" align="center" minH="100vh">
    <Container>
      <Text fontSize="xl" textAlign="center" marginBottom="10" className="fst-italic">Sign Up</Text>
      <form className="action">
        <div className="row g-2">
          <InputBox type="text" id="fName" label="First Name" className="col-md-6" />
          <InputBox type="text" id="lName" label="Last Name" />
          <InputBox type="email" id="email" label="Email Address" />
          <InputBox type="number" id="phoneNumber" label="Phone Number" />
          <PasswordInput label="Password" />
          <PasswordInput label="Confirm Password" />
          <Button variant="solid" colorScheme="teal" className="col-12" w="100%" marginTop="5">Sign In</Button>
          <Text fontSize="sm" textAlign="center">
            Already have an account?
            <Link href="/">Sign In</Link>
          </Text>
        </div>
      </form>
    </Container>
  </Flex>
);
export default register;
