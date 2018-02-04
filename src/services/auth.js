import config from 'config';
import { processResponse, processErrors } from './common';

export const login = fields =>
  fetch(`${config.url}session`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: new Headers(config.headers)
  })
    .then(processResponse, processErrors)
    .then(({ token, realms }) =>
      fetch(`${config.url}session`, {
        method: 'GET',
        headers: new Headers({
          ...config.headers,
          Authorization: `Bearer ${token}`
        })
      })
        .then(processResponse, processErrors)
        .then(result => ({ token, realms, result }))
        .catch(errors => Promise.reject(errors))
    )
    .catch(errors => Promise.reject(errors));

export const auth = token =>
  fetch(`${config.url}session`, {
    method: 'GET',
    headers: new Headers({
      ...config.headers,
      Authorization: `Bearer ${token}`
    })
  })
    .then(processResponse, processErrors)
    .catch(errors => Promise.reject(errors));
