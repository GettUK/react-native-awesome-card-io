import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  busy: false,
  errors: null
};

const logoutStart = state => ({ ...state, busy: true });

const logoutSuccess = () => initialState;

export default composeReducer(
  'ui/logout',
  {
    logoutStart,
    logoutSuccess
  },
  initialState
);
