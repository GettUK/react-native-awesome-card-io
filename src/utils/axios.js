import Axios from 'axios';
import isPlainObject from 'lodash/isPlainObject';
import config from 'config';
import { camelizeKeys, snakeizeKeys } from './transform';

const axios = Axios.create({
  baseURL: config.url,
  headers: config.headers,
  // proxy: {
  //   host: 'localhost',
  //   port: 3128
  // },
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
    // eslint-disable-next-line no-param-reassign
    config.params = snakeizeKeys(config.params);
  }

  return config;
});

export default axios;
