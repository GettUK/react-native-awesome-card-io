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
    postal_code: null,
    timezone: 'Europe/London'
  };
}

export function formatPrice(value) {
  return `£${(value / 100).toFixed(2)}`;
}
