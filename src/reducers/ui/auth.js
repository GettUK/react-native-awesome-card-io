import { composeReducer } from 'redux-compose-reducer';
import { Just, Nothing } from 'data.maybe';

const initialState = {
  busy: false,
  errors: Nothing()
};

const authStart = state => ({...state, busy: true, errors: Nothing()});

const authSuccess = () => initialState;

const authFailure = (state, { payload }) => ({...state, busy: false, errors: Just(payload)});

export default composeReducer(
  'ui/auth',
  {
    authStart,
    authSuccess,
    authFailure
  },
  initialState
);
