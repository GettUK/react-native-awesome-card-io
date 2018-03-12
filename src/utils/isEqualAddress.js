import { includes, isEqual, pick, map, round } from 'lodash';

// comparing looked-up address with saved address can sometimes yield different
// results for lat and lng e.g. 3.413240000000001 and 3.41324
const precision = 6;

function haveSameProps(address, otherAddress) {
  return isEqual(comparableProps(address), comparableProps(otherAddress));
}

function comparableProps(address) {
  // const props = ['line', 'lat', 'lng', 'postalCode'];
  const props = ['line', 'lat', 'lng', 'postal_code'];
  const toRoundProps = ['lat', 'lng'];
  const addressProps = pick(address, props);

  return map(addressProps, (value, key) => {
    return includes(toRoundProps, key) ? round(value, precision) : value;
  });
}

export const isEqualAddress = (address, otherAddress) => {
  return address && otherAddress && haveSameProps(address, otherAddress);
};
