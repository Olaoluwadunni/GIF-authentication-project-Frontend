import Cookies from 'js-cookie';
import { token } from '../helpers/variables';

const TokenService = () => {
  const getToken = () => {
    if (Cookies.get(token)) {
      return JSON.parse(Cookies.get(token));
    }
    return null;
  };

  const setToken = (userToken) => {
    Cookies.set(token, JSON.stringify(userToken));
  };

  const removeToken = () => {
    Cookies.remove(token);
  };

  return {
    getToken,
    setToken,
    removeToken,
  };
};

export default TokenService();
