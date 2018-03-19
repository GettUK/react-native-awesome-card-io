import { composeReducer } from 'redux-compose-reducer';

export const initialState = {
  busy: false
};

const start = () => ({ busy: true });

const succeed = () => ({ busy: false });

export default composeReducer('resetPassword', {
  start,
  succeed
}, initialState);
