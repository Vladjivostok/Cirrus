import axios from 'axios';

import { User } from '../common/types';
import { LOGIN_URL, dummyUrl } from '../common/constants';

const loginService = async (userData: User) => {
  const response = await axios({
    url: dummyUrl, // using dummyUrl for testing / leter replace with LOGIN_URL
    data: userData,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = response.data;
  console.log(data);
};

export default loginService;
