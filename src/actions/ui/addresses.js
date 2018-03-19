import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('ui/addresses', [
  'addressesEmpty',
  'receiveAddressesStart',
  'receiveAddressesFailure',
  'receiveAddressesSuccess'
]);

export const addressesEmpty = () => ({ type: TYPES.addressesEmpty });

export const receiveAddressesStart = () => ({ type: TYPES.receiveAddressesStart });

export const receiveAddressesFailure = errors => ({ type: TYPES.receiveAddressesFailure, payload: errors });

export const receiveAddressesSuccess = results => ({ type: TYPES.receiveAddressesSuccess, payload: results });

export const getAddresses = params => (dispatch, getState) => {
  const { ui } = getState();
  if (ui.addresses.busy) {
    return Promise.resolve();
  }

  dispatch(receiveAddressesStart());
  return get('/addresses', params)
    .then(({ data }) => {
      dispatch(receiveAddressesSuccess(data));
    })
    .catch((errors) => {
      dispatch(receiveAddressesFailure(errors));
    });
};
