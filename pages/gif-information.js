/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Text,
  Flex,
  Container,
  Image,
  Box,
  Divider,
} from '@chakra-ui/react';

const gifInformation = () => {
  const [gifDetails, setGifDetails] = useState('');
  useEffect(() => {
    const details = localStorage.getItem('gifDetails');

    setGifDetails(JSON.parse(details))
  }, [])
  return (
    <>
      <Link href="/search-gif">
        <a>
          <ArrowLeftIcon marginTop="6" marginLeft="5" textAlign="start" />
        </a>
      </Link>
      <Container minH="100vh">
        <Flex justifyContent="center" alignItems="center" direction="column">
          <Text fontStyle="italic" fontSize="xl" marginBottom="6" fontWeight="bold">
            GIF information
          </Text>
          <Flex justifyContent="center" alignItems="center" direction="">
            <Image
              src={gifDetails?.images?.downsized?.url}
              width="500"
              height="250"
              className="col-6 me-4"
            />
            <Box p="4" border="1px" borderColor="gray.200" className="col-6">
              <Text marginTop="4" marginBottom="1">
                <span className="fw-bold">Id:   </span>
                {gifDetails.id}
              </Text>
              <Divider />
              <Text marginTop="4" marginBottom="1">
                <span className="fw-bold mt-2">Username: </span>
                {gifDetails.username}
              </Text>
              <Divider />
              <Text marginTop="4" marginBottom="1">
                <span className="fw-bold mt-2">Title:  </span>
                {gifDetails.title}
              </Text>
              <Divider />
              <Text marginTop="4" marginBottom="1">
                <span className="fw-bold mt-4">Import Date: </span>
                {gifDetails.import_datetime}
              </Text>
              <Divider />
              <Text marginTop="4" marginBottom="1">
                <span className="fw-bold mt-2">Rating:  </span>
                {gifDetails.rating}
              </Text>
              <Divider />
              <Text marginTop="4" marginBottom="1">
                <span>URL: </span>
                <a href={gifDetails.embed_url}>
                  Link ➡
                </a>
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  )
};

export default gifInformation;
