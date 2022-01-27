/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
// import Cookie from 'js-cookie';
import Link from 'next/link';
import {
  Button, Flex, Text,
} from '@chakra-ui/react';
import getGIF from '../services/getGIF';

const SearchGif = () => {
  const [searchInput, setSearchInput] = useState('');
  const [gif, setGif] = useState([]);
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

  //   const handleClick = async (item) => {
  //     const newItem = [item];
  //     console.log(item.url);

  //     Cookie.set('gif', {
  //       item: {
  //         type: item.type,
  //         id: item.id,
  //         imageUrl: item.images.downsized.url,
  //         title: item.title,
  //         importDate: item.import_datetime,
  //         userName: item.username,
  //         rating: item.rating,
  //         url: item.url,
  //       },
  //     });
  //     localStorage.setItem('gif', JSON.stringify(newItem));
  //     console.log(item.type, '---item');
  //   };
  return (
    <div className="mt-4">
      <Text textAlign="end" marginRight="5">
        <Link href="/users">See Users</Link>
      </Text>
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
