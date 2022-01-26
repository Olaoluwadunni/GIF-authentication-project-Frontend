/* eslint-disable no-console */
const apiKey = process.env.API_KEY;
const baseUrl = 'https://api.giphy.com/v1/gifs/search';
const gifId = 'https://api.giphy.com/v1/gifs/{gif_id}';
console.log(baseUrl);
console.log(apiKey);
export { baseUrl, apiKey, gifId };
