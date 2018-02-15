import Axios from 'axios';
import isPlainObject from 'lodash/isPlainObject';
import { camelizeKeys, snakeizeKeys } from './transform';

const axios = Axios.create({
  baseURL: 'https://dev.gettaxi.me/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json',
  transformRequest(data) {
    if (isPlainObject(data)) {
      return JSON.stringify(snakeizeKeys(data));
    }
    return data;
  },
  transformResponse(data) {
    return camelizeKeys(data);
  }
});


axios.interceptors.request.use((config) => {
  if (config.params) {
    config.params = snakeizeKeys(config.params);
  }

  return config;
});

if (process.env.NODE_ENV === 'development') {
  function getUrl(config) {
    if (config.baseURL) {
      return config.url.replace(config.baseURL, '');
    }
    return config.url;
  }

  axios.interceptors.response.use((response) => {
      console.log('%c ' + response.status + ' - ' + getUrl(response.config) + ':', 'color: #008000; font-weight: bold', response);
      return response;
    },

    (error) => {
      console.log('%c ' + error.response.status + ' - ' + getUrl(error.response.config) + ':', 'color: #a71d5d; font-weight: bold', error.response);
      return Promise.reject(error);
    }
  );
}

export default axios;
