import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  results: null,
  busy: false,
  errors: null
};

const passegerViewEmpty = () => initialState;

const receivePassegerViewStart = state => ({...state, busy: true, errors: null});

const receivePassegerViewFailure = (state, { payload }) => ({...state, busy: false, errors: payload});

const receivePassegerViewSuccess = (state, { payload }) => ({...state, results: payload, busy: false});

export default composeReducer(
  'ui/passengerView',
  {
    passegerViewEmpty,
    receivePassegerViewStart,
    receivePassegerViewFailure,
    receivePassegerViewSuccess
  },
  initialState
);
