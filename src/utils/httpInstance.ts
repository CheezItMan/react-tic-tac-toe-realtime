import axios, { AxiosInstance } from 'axios';

const generateHttpInstance = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export default generateHttpInstance;
