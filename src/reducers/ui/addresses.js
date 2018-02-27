import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  results: null,
  busy: false,
  errors: null
};

const addressesEmpty = () => initialState;

const receiveAddressesStart = state => ({...state, busy: true, errors: null});

const receiveAddressesFailure = (state, { payload }) => ({...state, busy: false, errors: payload});

const receiveAddressesSuccess = (state, { payload }) => ({...state, results: payload, busy: false});

export default composeReducer(
  'ui/addresses',
  {
    addressesEmpty,
    receiveAddressesStart,
    receiveAddressesFailure,
    receiveAddressesSuccess
  },
  initialState
);
