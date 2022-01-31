/* eslint-disable react/jsx-filename-extension */
import { Text } from '@chakra-ui/react';
import Error from 'next/error';
import { AiFillHome } from 'react-icons/ai';

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const errorCode = res.ok ? false : res.statusCode;
  const json = await res.json();

  return {
    props: { errorCode, stars: json.stargazers_count },
  };
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return (
      <>
        <Error statusCode={errorCode} />
        <Text>
          Return to Home
          <AiFillHome />
        </Text>
      </>
    );
  }

  return (
    <div>
      Next stars:
      {' '}
      {stars}
    </div>
  );
}
