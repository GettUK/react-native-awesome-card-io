import { composeReducer } from 'redux-compose-reducer';
import { merge, isEmpty } from 'lodash/fp';

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
