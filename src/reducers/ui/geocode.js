import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  results: null,
  busy: false,
  errors: null
};

const geocodeEmpty = () => initialState;

const receiveGeocodeStart = state => ({ ...state, busy: true, errors: null });

const receiveGeocodeFailure = (state, { payload }) => ({ ...state, busy: false, errors: payload });

const receiveGeocodeSuccess = (state, { payload }) => ({ ...state, results: payload, busy: false });

export default composeReducer(
  'ui/geocode',
  {
    geocodeEmpty,
    receiveGeocodeStart,
    receiveGeocodeFailure,
    receiveGeocodeSuccess
  },
  initialState
);
