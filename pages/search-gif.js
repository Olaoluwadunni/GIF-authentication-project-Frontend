/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Icon } from '@chakra-ui/icons';
import { BiLogOutCircle } from 'react-icons/bi';

// import Cookie from 'js-cookie';
import Link from 'next/link';
import {
  Button, Flex, Image, Text,
} from '@chakra-ui/react';
import router from 'next/router';
import getGIF from '../services/getGIF';

const SearchGif = () => {
  const [searchInput, setSearchInput] = useState('');
  const [gif, setGif] = useState([]);
  const [admin, setAdmin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    // setIsLoading(true);
    getGIF(searchInput)
      .then((response) => {
        setGif(response?.data?.data);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };

  const logOut = () => {
    localStorage.clear();
    router.push('/');
  };

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
  console.log('%%%%%', admin);

  const saveToLocalStorage = (item) => {
    console.log(item);
    localStorage.setItem('gifDetails', JSON.stringify(item));
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
        <Text cursor="pointer" onClick={logOut}>
          <Icon as={BiLogOutCircle} marginLeft="5" w={7} h={7} color="red.500" />
          <span className="ms-1 text-danger">Sign out</span>
        </Text>
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
        <div className="row">
          {gif ? gif.map((item, id) => {
            const { images } = item;

            return (
              <Link href="/gif-information" key={id} className="img">
                <a className="col-6 col-md-3" onClick={()=>saveToLocalStorage(item)}>
                  <Image
                    width="500px"
                    height="250px"
                    src={images.downsized.url}
                    alt={images.downsized.url}
                    className="mt-4"
                  />
                </a>
              </Link>
            );
          })
            : <Text textAlign="center">Nothing to display here. Please search for something</Text>}
        </div>
      </div>
    </div>
  );
};

export default SearchGif;
