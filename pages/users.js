/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Text, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Container,
} from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import axios from 'axios';
import router from 'next/router';
import { baseUrl1 } from '../helpers/variables';

const users = () => {
  const [response, setResponse] = useState([]);

  const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { 'x-access-token': token },
    };
    axios.get(`${baseUrl1}/users`, config)
      .then((res) => {
        console.log('dfhdajsgj', res);
        setResponse(res.data.data);
      }, (error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllUsers();
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    console.log(token);
    if (!token || adminToken !== 'admin') {
      router.push('/');
    }
  }, []);

  // eslint-disable-next-line react/jsx-filename-extension
  return (
    <>
      <Link href="/search-gif">
        <a>
          <ArrowLeftIcon marginTop="6" marginLeft="5" textAlign="start" />
        </a>
      </Link>
      <Container>
        <Flex justifyContent="center" direction="column" alignItems="center" minH="60vh">
          <Text fontStyle="italic" fontSize="xl" marginBottom="6" fontWeight="bold">
            List of Users
          </Text>
          <Table variant="striped">
            <TableCaption>This can only be seen by admin</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">id</Th>
                <Th textAlign="center">Name</Th>
                <Th textAlign="center">Email Address</Th>
                <Th textAlign="center">Phone Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {response.map((item) => (
                <Tr key={item.id}>
                  <Td textAlign="center">{item.id}</Td>
                  <Td textAlign="center">{item.name}</Td>
                  <Td textAlign="center">{item.email}</Td>
                  <Td textAlign="center">{item.phone_number}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Container>
    </>
  );
};

export default users;
