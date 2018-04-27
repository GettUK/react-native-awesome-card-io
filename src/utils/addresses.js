import { get } from 'utils';

export const processLocation = (location) => {
  const { lat, lng, postalCode, name, formattedAddress, countryCode, timezone, city, placeId, airport } = location;

  const processedLocation = {
    lat,
    lng,
    postalCode,
    countryCode,
    line: name && !formattedAddress.includes(name) ? [name, formattedAddress].join(', ') : formattedAddress,
    timezone,
    city,
    placeId,
    airport
  };

  if (
    !processedLocation.line ||
    !lat ||
    !lng ||
    (!postalCode && countryCode === 'GB')
  ) {
    throw new Error(processedLocation.line);
  }
  return processedLocation;
};

export function geocode(params) {
  return get('/addresses/geocode', params).then(res => res.data);
}
