/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-spacing */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
// import { Icon } from '@chakra-ui/icons';
// import { BiLogOutCircle } from 'react-icons/bi';
// import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import {
  Image, Text, Box,
} from '@chakra-ui/react';
import router from 'next/router';
import Dropdown from '../components/Dropdown';
import getGIF from '../services/getGIF';

const SearchGif = () => {
  const [searchInput, setSearchInput] = useState('');
  const [gif, setGif] = useState([]);
  const [admin, setAdmin] = useState('');

  const handleSubmit = () => {
    // e.preventDefault();
    console.log(searchInput);
    // setIsLoading(true);
    getGIF(searchInput)
      .then((response) => {
        setGif(response?.data?.data);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };

  // const logOut = () => {
  //   localStorage.clear();
  //   router.push('/');
  // };

  useEffect(() => {
    const role = localStorage.getItem('adminToken');
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      router.push('/');
    }
    setAdmin(role);
    console.log('>>>>>>>', role);
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [searchInput]);

  console.log('%%%%%', admin);

  const saveToLocalStorage = (item) => {
    console.log(item);
    localStorage.setItem('gifDetails', JSON.stringify(item));
  };

  return (
    <>
      <Box className="d-flex justify-content-evenly align-items-center" bg="teal" padding="4">
        {/* <Text cursor="pointer" onClick={logOut}>
          <Icon as={BiLogOutCircle} marginLeft="5" w={7} h={7} color="red.500" />
          <span className="ms-1 text-danger">Sign out</span>
        </Text> */}
        {/* {(admin === 'super-admin' || admin === 'admin')
          ? (
          <Link href="/view-users">
            <Button
              variant="solid"
              colorScheme="teal"
              marginRight="5"
              size="xs"
            >
              See Users
            </Button>
          </Link>
          )
          : null} */}

        {/* <Flex
            justifyContent="center"
            align="center"
            textAlign="center"
            className="col-12 col-md-12"
          > */}
        {/* <Image src={logo} alt="forgot password icon" /> */}
        <form className="d-flex w-75 me-2 search-wrapper" onSubmit={handleSubmit}>
          <input
            className="form-control ps-5"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Type to search..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <AiOutlineSearch className="search-icon" />
        </form>
        {/* </Flex> */}

        <Dropdown admin={admin} />
      </Box>
      <hr />
      {/* <Text textAlign="center" marginTop="2" marginBottom="0">GIF:</Text> */}
      <div className="container mt-2">
        <div className="row">
          {gif.length ? gif.map((item, id) => {
            const { images } = item;

            return (
              <Link href="/gif-information" key={id} className="img">
                <a role="link" className="col-6 col-md-3" onClick={()=>saveToLocalStorage(item)}>
                  <Image
                    width="500px"
                    height="250px"
                    src={images.downsized.url}
                    alt={images.downsized.url}
                    className="mt-4 img-card"
                  />
                </a>
              </Link>
            );
          })
            : <Text textAlign="center">Nothing to display here. Please search for something</Text>}
        </div>
      </div>
    </>
  );
};

export default SearchGif;
