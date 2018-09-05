import {
  uniq,
  curry,
  values,
  concat,
  reduce,
  isEqual,
  isArray,
  isString,
  isUndefined
} from 'lodash/fp';
import { throttle, has } from 'lodash';
import config from 'config';
import validate from './validate';

export const capitalize = ([first, ...rest]) =>
  (!isUndefined(first) ? first.toUpperCase() + rest.join('').toLowerCase() : '');
export const trimZero = ([first, ...rest]) =>
  (isEqual('0', first) ? rest.join('') : first + rest.join(''));
export const firstOne = string => string.charAt(0).toUpperCase();
export const ternaryOp = curry((condition, fnLeft, fnRight) => (condition ? fnLeft : fnRight));
export const objectToArray = curry(object =>
  Object.entries(object).map(([prop, value]) => ({ prop, value })));
export const toArrayItems = curry(items =>
  uniq(reduce(
    (sum, value) =>
      ternaryOp(
        isArray(value),
        concat(value, sum),
        ternaryOp(isString(value), concat([value], sum), null)
      ),
    [],
    values(items)
  )));

export function nullAddress(line = null) {
  return {
    line,
    lat: null,
    lng: null,
    postalCode: null,
    timezone: 'Europe/London'
  };
}

export function formatPrice(value, currency) {
  return `${currency}${(value / 100).toFixed(2)}`;
}

export const getFormatPrice = price => price && formatPrice(price, '£');

export function throttledAction(fn) {
  return throttle(fn, 1000, { trailing: false });
}

export const isInputsValid = (keys, data, validationRules, fn) => {
  if (keys) {
    let results = null;

    (keys).forEach((key) => {
      if (key in validationRules) {
        const result = validate(data, { [key]: validationRules[key] });

        if (result) results = { ...results, ...result };
      }
    });
    if (results) fn(results);

    return !results;
  }

  return true;
};

export const normalizeCoordinate = coord => +parseFloat(coord).toFixed(12);

export const getHeight = type => (type && type.height) || 0;

export const filterBySearchValue = (array, params, searchValue) => {
  const searchValues = searchValue.toLowerCase().split(' ').filter(Boolean);

  return array.filter((item) => {
    let itemString = params.map(param => item[param]).join(' ').toLowerCase();

    return searchValues.every((value) => {
      const formattedValue = value.trim();
      const includes = itemString.includes(formattedValue);

      if (includes) itemString = itemString.replace(formattedValue, '').trim();

      return includes;
    });
  });
};

export const isDevMode = has(config, 'env') ? config.env === 'development' : process.env.NODE_ENV === 'development';

export const prepareCoordinates = address => (
  address && address.lat && address.lng
    ? { latitude: address.lat, longitude: address.lng }
    : address
);

export const areCoordinatesSimilar = (first, second, precision = 0.0001) => // about 10 meters
  Math.max(Math.abs(first.lat - second.lat), Math.abs(first.lng - second.lng)) < precision;
