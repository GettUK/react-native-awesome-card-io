import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  showCarAnimations: true,
  showLocatingCarAnimation: true
};

const changeField = (state, { payload: { field, value } }) =>
  update(state, field, value);

export default composeReducer(
  'app/devSettings',
  {
    changeField
  },
  initialState
);
