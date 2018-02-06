import config from 'config';
import { processResponse, processErrors } from './common';

export const getPassengerID = (token, id) =>
  fetch(`${config.url}passengers/${id}`, {
    method: 'GET',
    headers: new Headers({
      ...config.headers,
      Authorization: `Bearer ${token}`
    })
  })
    .then(processResponse, processErrors)
    .catch(errors => Promise.reject(errors));
