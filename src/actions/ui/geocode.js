import { createTypes } from 'redux-compose-reducer';
import { join, includes } from 'lodash/fp';
import { get } from 'utils';

const TYPES = createTypes('ui/geocode', [
  'geocodeEmpty',
  'receiveGeocodeStart',
  'receiveGeocodeFailure',
  'receiveGeocodeSuccess'
]);

export const geocodeEmpty = () => ({ type: TYPES.geocodeEmpty });

export const receiveGeocodeStart = () => ({ type: TYPES.receiveGeocodeStart });

export const receiveGeocodeFailure = errors => ({ type: TYPES.receiveGeocodeFailure, payload: errors });

export const receiveGeocodeSuccess = results => ({ type: TYPES.receiveGeocodeSuccess, payload: results });

const processLocation = (location) => {
  const {
    lat,
    lng,
    postcode,
    name,
    formattedAddress,
    countryCode,
    timezone,
    city,
    placeId
  } = location;
  const processedLocation = {
    lat,
    lng,
    postalCode: postcode,
    countryCode,
    line:
      name && !includes(name, formattedAddress) ?
        join(', ', [name, formattedAddress]) :
        formattedAddress,
    timezone,
    city,
    placeId
  };
  if (
    !processedLocation.line ||
    !lat ||
    !lng ||
    (!postcode && countryCode === 'GB')
  ) {
    throw new Error(processedLocation.line);
  }
  return processedLocation;
};

export const geocode = params => (dispatch, getState) => {
  const { ui } = getState();
  if (ui.geocode.busy) {
    return Promise.resolve();
  }

  dispatch(receiveGeocodeStart());

  return get('/addresses/geocode', params)
    .then(({ data }) => processLocation(data))
    .then((data) => {
      dispatch(receiveGeocodeSuccess(data));
      return data;
    })
    .catch((errors) => {
      dispatch(receiveGeocodeFailure(errors));
    });
};
