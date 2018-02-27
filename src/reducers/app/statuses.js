import { composeReducer } from 'redux-compose-reducer';
import { merge, isEmpty } from 'lodash/fp';

const initialState = {
  isOpenKeyboard: false
};

const changeKeyboardStatus = (state, { payload }) => ({...state, isOpenKeyboard: payload});

const changePermissions = (state, { payload }) =>
  ({...state, permissions: isEmpty(state.permissions) ? payload : merge(state.permissions, payload)});

export default composeReducer(
  'app/statuses',
  {
    changeKeyboardStatus,
    changePermissions
  },
  initialState
);
