import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpRequest.interceptors.request.use((config) => {
  if (config.headers.Authorization) {
    console.log('Authorization Header:', config.headers.Authorization);
  }
  return config;
});

export const setDefaultHeaders = (headers) => {
  Object.assign(httpRequest.defaults.headers.common, headers);
};

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

export default httpRequest;
