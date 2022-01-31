/* eslint-disable no-console */
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = 'https://api.giphy.com/v1/gifs/search';
const gifId = 'https://api.giphy.com/v1/gifs/{gif_id}';
console.log(baseUrl);
console.log(apiKey);
const baseUrl1 = process.env.NEXT_PUBLIC_API_URL;
const token = 'userToken';
// const admintoken = 'adminToken';
// const lettersRegex = /^[a-zA-Z]*$/g;
// const emailRegex = /\b[\w-]+@[\w-]+\.\w{2,4}\b/gi;
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

export {
  baseUrl, apiKey, gifId, baseUrl1, token,
};
