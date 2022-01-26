/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import { useState } from 'react';
import Cookie from 'js-cookie';
import Link from 'next/link';
import { Button, Flex, Text } from '@chakra-ui/react';
import getGIF from '../services/getGIF';
import { ReactComponent as Loader } from '../public/Spinner-1s-200px.svg';


const Home = () => {
  const [searchInput, setSearchInput] = useState();
  const [gif, setGif] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    getGIF(searchInput)
      .then((response) => setGif(response?.data))
      .catch((err) => console.log(JSON.stringify(err)))
      .finally(() => setIsLoading(false));
  };
  const gifInfo = gif?.data;
  console.log(gifInfo);

  const handleClick = async (item) => {
    const newItem = [item];
    console.log(item.url);

    Cookie.set('gif', {
      item: {
        type: item.type,
        id: item.id,
        imageUrl: item.images.downsized.url,
        title: item.title,
        importDate: item.import_datetime,
        userName: item.username,
        rating: item.rating,
        url: item.url,
      },
    });
    localStorage.setItem('gif', JSON.stringify(newItem));
    console.log(item.type, '---item');
  };
  return (
    <div className="mt-4">
      <Text textAlign="end" marginRight="5">
        <Link href="/users">See Users</Link>
      </Text>
      <Flex justifyContent="center" align="center" textAlign="center" className="col-12 col-md-12">
        <form onSubmit={handleSubmit} className="d-flex mb-4 w-50">
          <input
            className="form-control me-2"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Type to search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="solid" colorScheme="teal" className="col-12">Search</Button>
        </form>
      </Flex>
      <hr />
      <Text textAlign="center" marginTop="2" marginBottom="0">GIF:</Text>
      {/* {JSON.stringify(gif)} */}
      {gif.data ? gif.data.map((item) => {
        const { images } = item;
        console.log({ images });
        return (
          isLoading ? (
            <Loader />
          ) : (
            <Link to={`/gif-information/${item.id}`}>
              {/* <div> */}
              <button type="button" onClick={() => handleClick(item)}>
                <img
                  width="300em"
                  height="250em"
                  src={images.downsized.url}
                  alt={images.downsized.url}
                  className="me-4 mt-4 img-card"
                />
              </button>
              {/* </div> */}
            </Link>
          )
        );
      })
        : <Text textAlign="center">Nothing to display here. Please search for something</Text>}
    </div>
  );
};

export default Home;
