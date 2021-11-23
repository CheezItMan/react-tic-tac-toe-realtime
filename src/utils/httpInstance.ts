import axios from 'axios';

const generateHttpInstance = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export default generateHttpInstance;
