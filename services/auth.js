import axios from 'axios';
import { baseUrl1 } from '../helpers/variables';

const AuthService = () => {
  const loginUser = async (user) => {
    const response = await axios.post(`${baseUrl1}/login`, user);
    return response.data;
  };
  const registerUser = async (userDetails) => {
    const response = await axios.post(`${baseUrl1}/register`, userDetails);
    return response.data;
  };

  return {
    registerUser,
    loginUser,
  };
};

export default AuthService();
