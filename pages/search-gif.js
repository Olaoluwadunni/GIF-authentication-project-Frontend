/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-spacing */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
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
    console.log(searchInput);
    getGIF(searchInput)
      .then((response) => {
        setGif(response?.data?.data);
      })
      .catch((err) => console.log(JSON.stringify(err)));
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
        <Dropdown admin={admin} />
      </Box>
      <hr />
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
