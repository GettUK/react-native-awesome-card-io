import { composeReducer } from 'redux-compose-reducer';

export const initialState = {
  busy: false
};

const start = (state, { data }) => {
  return { busy: true };
};

const succeed = (state, { data }) => {
  return { busy: false };
};

export default composeReducer('resetPassword', {
  start,
  succeed,
}, initialState);
