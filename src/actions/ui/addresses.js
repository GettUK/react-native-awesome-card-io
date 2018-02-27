import { createTypes } from 'redux-compose-reducer';
import { getAddresses } from 'services/passengers';

const TYPES = createTypes('ui/addresses',
  ['addressesEmpty', 'receiveAddressesStart', 'receiveAddressesFailure', 'receiveAddressesSuccess']);

export const addressesEmpty = () => ({ type: TYPES.addressesEmpty });

export const receiveAddressesStart = () => ({ type: TYPES.receiveAddressesStart });

export const receiveAddressesFailure = errors => ({ type: TYPES.receiveAddressesFailure, payload: errors });

export const receiveAddressesSuccess = results => ({ type: TYPES.receiveAddressesSuccess, payload: results });

export const receiveAddresses = fields => (dispatch, getState) => {
  const { ui, session } = getState();
  if (ui.addresses.busy) {
    return Promise.resolve();
  }

  dispatch(receiveAddressesStart());

  return getAddresses(session.token, fields)
    .then(result => {
      dispatch(receiveAddressesSuccess(result));
    })
    .catch(errors => {
      dispatch(receiveAddressesFailure(errors));
    });
};
