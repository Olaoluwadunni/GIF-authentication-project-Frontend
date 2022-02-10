/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Image from 'next/image';
import {
  Flex, Text, Container, Button, Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import Success from '../public/confetti.png';

const resetSuccessful = () => (
  <div>
    <Flex direction="column" justify="center" align="center" minH="100vh">
      <Container>
        <Box align="center">
          <Image src={Success} alt="forgot password icon" width={100} height={100} />
        </Box>
        <Text fontSize="2xl" textAlign="center" marginTop="2" marginBottom="1" fontWeight="medium">
          Password Reset
        </Text>
        <Text fontSize="xm" textAlign="center" marginBottom="6" className="fw-semibold" color="brand.100">
          Your password has been reset successfully
        </Text>
        <Box align="center">
          <Link href="/">
            <a>
              <Button
                variant="solid"
                colorScheme="teal"
                className="col-12"
                w="70%"
                marginTop="5"
                mx="auto"
                type="submit"
              >
                Proceed to Log in
              </Button>
            </a>
          </Link>
        </Box>
      </Container>
    </Flex>
  </div>
);

export default resetSuccessful;
