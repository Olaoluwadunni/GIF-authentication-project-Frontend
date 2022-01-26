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
import React from 'react';

const users = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Container>
    <Flex justifyContent="center" direction="column" alignItems="center" minH="60vh">
      <Text fontStyle="italic" fontSize="xl" marginBottom="6" fontWeight="bold">
        List of Users
      </Text>
      <Table variant="striped">
        <TableCaption>This can only be seen by admin</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">First Name</Th>
            <Th textAlign="center">Last Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign="center">inches</Td>
            <Td textAlign="center">millimetres (mm)</Td>
          </Tr>
          <Tr>
            <Td textAlign="center">feet</Td>
            <Td textAlign="center">centimetres (cm)</Td>
          </Tr>
          <Tr>
            <Td textAlign="center">yards</Td>
            <Td textAlign="center">metres (m)</Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  </Container>
);

export default users;
