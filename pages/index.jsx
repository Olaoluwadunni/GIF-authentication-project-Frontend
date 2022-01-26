import {
  Button, Container, Flex, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';

export default function Home() {
  return (
    <Flex direction="column" justify="center" align="center" minH="100vh">
      <Container>
        <Text fontSize="xl" textAlign="center" marginBottom="10" className="fst-italic">Log In</Text>
        <form className="col-12">
          <InputBox type="email" id="email" label="Email Address" />
          <PasswordInput label="Password" />
          <div>
            <Button variant="solid" colorScheme="teal" className="col-12" w="100%" marginTop="5">Sign In</Button>
            <div fontSize="xl" className="d-flex justify-content-between fst-italic mt-2">
              <Text fontSize="sm">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account yet?
                <Link href="/sign-up">Sign Up</Link>
              </Text>
              <Link href="/forgot-password" class="text-decoration-none"><Text fontSize="sm" className="labelForm text--primary">Forgot Password?</Text></Link>
            </div>
          </div>
        </form>
      </Container>
    </Flex>
  );
}
