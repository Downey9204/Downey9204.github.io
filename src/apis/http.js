import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

const request = async (config) => {
  try {
    const response = await instance(config);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const http = {
  get: (url, restConfig = {}) => request({ method: 'GET', url, ...restConfig }),
  post: (url, data, restConfig = {}) =>
    request({ method: 'POST', url, data, ...restConfig }),
};

export default http;
