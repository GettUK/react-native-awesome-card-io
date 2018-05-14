import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  busy: false,
  errors: null
};

const authStart = state => ({ ...state, busy: true, errors: null });

const authSuccess = () => initialState;

const authFailure = (state, { payload }) => ({ ...state, busy: false, errors: payload });

export default composeReducer(
  'ui/auth',
  {
    authStart,
    authSuccess,
    authFailure
  },
  initialState
);
