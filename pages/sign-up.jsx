/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import { useState } from 'react';
import {
  Button, Container, Flex, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';
import { baseUrl1 } from '../helpers/variables';

const register = () => {
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
        console.log(name);
      }, (error) => {
        console.log(error);
      });
  };
  return (
    <Flex direction="column" justify="center" align="center" minH="100vh">
      <Container>
        <Text fontSize="xl" textAlign="center" marginBottom="10" className="fst-italic">Sign Up</Text>
        <form className="action" method="post">
          <div className="row g-2">
            <InputBox
              type="text"
              id="name"
              label="Name"
              className="col-md-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputBox
              type="email"
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              type="number"
              id="phoneNumber"
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <PasswordInput
              value={password}
              id="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label="Confirm Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="solid"
              colorScheme="teal"
              className="col-12"
              w="100%"
              marginTop="5"
              onClick={signUp}
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
  );
};
export default register;
