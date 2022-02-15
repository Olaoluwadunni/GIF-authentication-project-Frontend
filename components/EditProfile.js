/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  Text,
  Select,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import InputBox from './InputBox';
import { baseUrl1 } from '../helpers/variables';

function EditProfile({ firstField, isOpen, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  const {
    register, handleSubmit, formState: {
      isSubmitting,
    },
  } = useForm();
  const getAdminProfile = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { 'x-access-token': token },
    };
    return axios
      .get(`${baseUrl1}/profile`, config)
      .then((response) => {
        console.log(response.data);
        const { data } = response.data;

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);
        setGender(data.gender);
        // if (response.status === 200) {
        //   toast.success(response.data.message);
        // }
      }, (error) => {
        // toast.error(error.response.data.message);
        console.log(error.message);
      });
  };
  useEffect(() => {
    getAdminProfile();
  }, []);
  const editProfile = async (e) => {
    console.log(firstName, lastName);
    const token = localStorage.getItem('token');
    const config = {
      headers: { 'x-access-token': token },
    };
    // console.log(gender)
    return axios
      .put(`${baseUrl1}/update`, {
        first_name: e.firstName,
        last_name: e.lastName,
        phone_number: Number(e.phoneNumber),
        gender: gender,
      }, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
        }
        console.log(firstName, lastName);
      }, (error) => {
        toast.error(error.response.data.message);
        console.log(error.message);
      });
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Edit Profile
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <InputBox
                  type="text"
                  id="firstName"
                  label="First Name"
                  others={register('firstName')}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Box>

              <Box>
                <InputBox
                  type="text"
                  id="lastName"
                  label="Last Name"
                  others={register('lastName')}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Box>
              <Box>
                <InputBox
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  others={register('phoneNumber')}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>

              <Box>
                <Select
                  placeholder="Select your gender"
                  name="gender"
                  id="gender"
                  {...register('gender')}
                  className="mt-1"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleSubmit(editProfile)}
              disabled={!phoneNumber || !firstName || !lastName || !gender}
            >
              {isSubmitting ? <Spinner /> : (<Text> Submit </Text>)}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Toaster />
    </>
  );
}

export default EditProfile;
