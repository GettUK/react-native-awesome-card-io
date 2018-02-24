import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  token: ''
};

const saveToken = (state, { payload }) => ({ token: payload.token });

export default composeReducer(
  'app/push',
  {
    saveToken
  },
  initialState
);
