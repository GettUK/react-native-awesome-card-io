import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  token: null,
  result: {}
};

const userLogin = (state, { payload: { token } }) => ({ ...state, token });

const userData = (state, { payload }) => ({ ...state, result: payload });

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
