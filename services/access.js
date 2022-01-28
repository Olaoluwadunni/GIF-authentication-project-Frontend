import axios from 'axios';
// import TokenService from './token';
import { baseUrl1 } from '../helpers/variables';

const apiInstance = axios.create({
  baseURL: baseUrl1,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance;
