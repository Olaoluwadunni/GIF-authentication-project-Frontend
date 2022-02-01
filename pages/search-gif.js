/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Icon } from '@chakra-ui/icons';
import { BiLogOutCircle } from 'react-icons/bi';

// import Cookie from 'js-cookie';
import Link from 'next/link';
import {
  Button, Flex, Text,
} from '@chakra-ui/react';
import router from 'next/router';
import getGIF from '../services/getGIF';

const SearchGif = () => {
  const [searchInput, setSearchInput] = useState('');
  const [gif, setGif] = useState([]);
  const [admin, setAdmin] = useState('');
  // const [isLoading, setIsLoading] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    // setIsLoading(true);
    getGIF(searchInput)
      .then((response) => {
        setGif(response?.data?.data);
      })
      .catch((err) => console.log(JSON.stringify(err)));
    //   .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const role = localStorage.getItem('adminToken');
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
    setAdmin(role);
    console.log('>>>>>>>', role);
  }, []);
  console.log('%%%%%', admin);
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
        <Link href="/">
          <a>
            <>
              <Icon as={BiLogOutCircle} marginLeft="5" w={7} h={7} color="red.500" />
              <span className="ms-1 text-danger">Sign out</span>
            </>
          </a>

        </Link>

        {(admin === 'admin')
          ? (
            <Link href="/users"><Button variant="solid" colorScheme="teal" marginRight="5" size="xs">See Users</Button></Link>
          )
          : null}
      </div>

      <Flex justifyContent="center" align="center" textAlign="center" className="col-12 col-md-12">
        <form className="d-flex mb-4 w-50">
          <input
            className="form-control me-2"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Type to search..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <Button variant="solid" colorScheme="teal" className="col-12" onClick={handleSubmit}>Search</Button>
        </form>
      </Flex>
      <hr />
      <Text textAlign="center" marginTop="2" marginBottom="0">GIF:</Text>
      <div className="container">
        {gif ? gif.map((item) => {
          const { images } = item;
          return (
            <div>
              <Link href="/gif-details">
                <a>
                  <img
                    width="300em"
                    height="250em"
                    src={images.downsized.url}
                    alt={images.downsized.url}
                    className="me-4 mt-4 img-card img-fluid"
                  />
                </a>
              </Link>
            </div>
          );
        })
          : <Text textAlign="center">Nothing to display here. Please search for something</Text>}
      </div>
    </div>
  );
};

export default SearchGif;
