import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  token: null,
  user: {},
  loading: false,
  errors: null
};

const loginSuccess = (state, { payload }) => (
  update(state, 'token', payload)
);

const getCurrentUserStart = state => (
  update(state, { loading: true, errors: null })
);

const getCurrentUserSuccess = (state, { payload }) => (
  update(state, { user: payload, loading: false, errors: null })
);

const getCurrentUserFailure = (state, { payload }) => (
  update(state, { loading: false, errors: payload })
);

const logout = () => initialState;

export default composeReducer(
  'session',
  {
    loginSuccess,
    getCurrentUserSuccess,
    getCurrentUserStart,
    getCurrentUserFailure,
    logout
  },
  initialState
);
