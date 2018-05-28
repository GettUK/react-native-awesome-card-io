import { composeReducer } from 'redux-compose-reducer';
import { merge, isEmpty } from 'lodash/fp';
import update from 'update-js';

const initialState = {
  params: {
    footer: {},
    pointList: {},
    connectBar: {}
  },
  isOpenKeyboard: false
};

const changeParamsField = (state, { payload: { field, value } }) =>
  update(state, { [`params.${field}`]: value });

const changePermissions = (state, { payload }) =>
  ({ ...state, permissions: isEmpty(state.permissions) ? payload : merge(state.permissions, payload) });

export default composeReducer(
  'app/statuses',
  {
    changeParamsField,
    changePermissions
  },
  initialState
);
