import config from 'config';
import { processResponse, processErrors } from './common';

export const settings = token =>
  fetch(`${config.url}company/settings`, {
    method: 'GET',
    headers: new Headers({
      ...config.headers,
      Authorization: `Bearer ${token}`
    })
  })
    .then(processResponse, processErrors)
    .catch(errors => Promise.reject(errors));
