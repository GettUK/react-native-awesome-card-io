import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  busy: false,
  errors: null
};

const logoutSuccess = () => initialState;

export default composeReducer(
  'ui/logout',
  {
    logoutSuccess
  },
  initialState
);
