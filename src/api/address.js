import { get, geocode, processLocation } from 'utils';
import axios from 'axios';

const getAddress = (params, onCancelToken = () => {}) => {
  const realParams = typeof params === 'string' ? { string: params } : params;
  return get('/addresses', realParams, { cancelToken: new axios.CancelToken(onCancelToken) })
    .then(res => res.data.list);
};

const getAddressWithLocation = (params, onCancelToken) =>
  getAddress(params, onCancelToken)
    .then((list) => {
      if (list[0]) {
        const { id, text, google, predefined } = list[0];
        const payload = {
          locationId: id,
          string: text,
          predefined,
          google
        };
        return geocode(payload);
      }
      return Promise.reject(new Error('getAddress bad response'));
    })
    .then(location => processLocation(location));

export default {
  getAddress,
  getAddressWithLocation
};
