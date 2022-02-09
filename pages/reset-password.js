/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import {
  Button, Container, Flex, Text,
} from '@chakra-ui/react';
import PasswordInput from '../components/PasswordInput';

const resetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');
  return (
    <div>
      <Flex direction="column" justify="center" align="center" minH="100vh">
        {/* <Image src={passwordIcon} alt="forgot password icon" width={80} height={80} /> */}
        <Container>
          <Text fontSize="2xl" textAlign="center" marginTop="4" marginBottom="1" fontWeight="medium">Forgot Password?</Text>
          <Text fontSize="xm" textAlign="" marginBottom="6" className="fw-semibold" color="brand.100">Enter the email associated with your account and we will send an email with instructions to reset your password</Text>
          <form className="action" method="post">
            <div className="row g-2">
              <div className="mb-3">
                <PasswordInput
                  label="New Password"
                  value={newPassword}
                //   validate={errors.password ? 'is-invalid' : ''}
                //   others={register('password')}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <PasswordInput
                  label="Confirm New Password"
                  value={confirmNewPassword}
                //   validate={errors.password ? 'is-invalid' : ''}
                //   others={register('password')}
                  onChange={(e) => setconfirmNewPassword(e.target.value)}
                />
              </div>
              <Button
                variant="solid"
                colorScheme="teal"
                className="col-12"
                w="100%"
                marginTop="5"
                type="submit"
              >
                Reset Password
              </Button>
            </div>
          </form>
        </Container>
      </Flex>
    </div>
  );
};

export default resetPassword;
