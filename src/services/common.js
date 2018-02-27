import { join, includes } from 'lodash/fp';

export function processResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.text().then(text => (text ? JSON.parse(text) : {}));
  }

  return response.json().then(errors => Promise.reject(errors));
}

export function processErrors() {
  return Promise.reject({
    non_field_errors: ['Something wrong... Try again.']
  });
}

export function processLocation(geocodedLoc) {
  const {
    lat,
    lng,
    postcode,
    name,
    formatted_address: formattedAddress,
    country_code,
    timezone,
    city,
    place_id: placeId
  } = geocodedLoc;
  const processedLocation = {
    lat,
    lng,
    postal_code: postcode,
    country_code,
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
    (!postcode && country_code === 'GB')
  ) {
    throw new Error(processedLocation.line);
  }
  return processedLocation;
}
