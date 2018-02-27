import config from 'config';
import { has, compact, isUndefined } from 'lodash/fp';
import {
  queryString,
  queryCountriesFilter,
  queryLat,
  queryLng,
  queryLocationId,
  queryGoogle,
  queryPredefined,
  queriesToString
} from 'services/queries';
import { processResponse, processErrors, processLocation } from './common';

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

export const getAddresses = (token, fields) => {
  const query = queriesToString([
    queryString(fields.string),
    queryCountriesFilter(fields.filters)
  ]);
  return fetch(`${config.url}addresses?${query}`, {
    method: 'GET',
    headers: new Headers({
      ...config.headers,
      Authorization: `Bearer ${token}`
    })
  })
    .then(processResponse, processErrors)
    .catch(errors => Promise.reject(errors));
};

export const geocode = (token, fields) => {
  const query = queriesToString(
    compact([
      has('string', fields) && !isUndefined(fields.string) ?
        queryString(fields.string) :
        null,
      has('locationId', fields) && !isUndefined(fields.locationId) ?
        queryLocationId(fields.locationId) :
        null,
      has('google', fields) && !isUndefined(fields.google) ?
        queryGoogle(fields.google) :
        null,
      has('predefined', fields) && !isUndefined(fields.predefined) ?
        queryPredefined(fields.predefined) :
        null,
      has('lat', fields) && !isUndefined(fields.lat) ?
        queryLat(fields.lat) :
        null,
      has('lng', fields) && !isUndefined(fields.lng) ?
        queryLng(fields.lng) :
        null
    ])
  );
  return fetch(`${config.url}addresses/geocode?${query}`, {
    method: 'GET',
    headers: new Headers({
      ...config.headers,
      Authorization: `Bearer ${token}`
    })
  })
    .then(processResponse, processErrors)
    .then(processLocation)
    .catch(errors => Promise.reject(errors));
};
