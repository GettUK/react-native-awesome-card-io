import { curry, compose, join, map } from 'lodash/fp';

const QUERY_STRING = '#STRING';
const QUERY_COUNTRIES_FILTER = '#COUNTRIES_FILTER';
const QUERY_LAT = '#LAT';
const QUERY_LNG = '#LNG';
const QUERY_LOCATION_ID = '#LOCATION_ID';
const QUERY_GOOGLE = '#GOOGLE';
const QUERY_PREDEFINED = '#PREDEFINED';

const encodeQuery = curry(
  (query, value) => `${encodeURIComponent(query)}=${encodeURIComponent(value)}`
);

export const createQuery = curry((query, value) => [query, value]);

export const queryString = createQuery(QUERY_STRING);
export const queryCountriesFilter = createQuery(QUERY_COUNTRIES_FILTER);
export const queryLat = createQuery(QUERY_LAT);
export const queryLng = createQuery(QUERY_LNG);
export const queryLocationId = createQuery(QUERY_LOCATION_ID);
export const queryGoogle = createQuery(QUERY_GOOGLE);
export const queryPredefined = createQuery(QUERY_PREDEFINED);

export const queriesToString = compose(
  join('&'),
  map(([query, value]) => {
    switch (query) {
      case QUERY_STRING: {
        return encodeQuery('string', value);
      }
      case QUERY_COUNTRIES_FILTER: {
        return encodeQuery('countries_filter[]', value);
      }
      case QUERY_LAT: {
        return encodeQuery('lat', value);
      }
      case QUERY_LNG: {
        return encodeQuery('lng', value);
      }
      case QUERY_LOCATION_ID: {
        return encodeQuery('location_id', value);
      }
      case QUERY_GOOGLE: {
        return encodeQuery('google', value);
      }
      case QUERY_PREDEFINED: {
        return encodeQuery('predefined', value);
      }
      default: {
        throw new Error('Query does not match.');
      }
    }
  })
);
