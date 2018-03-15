import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  token: null,
  realms: null,
  result: {}
};

const userLogin = (state, { payload: { token, realms } }) => ({...state, token, realms});

const userData = (state, { payload }) => ({...state, result: payload});

const userLogout = () => initialState;

export default composeReducer(
  'session',
  {
    userLogin,
    userData,
    userLogout
  },
  initialState
);
