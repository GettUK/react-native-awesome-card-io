import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  items: []
};

const getOrders = (state, { data }) => {
  return update.with(state, 'items', (old) => ([...old, ...data.items]));
};

const clearList = () => initialState;

export default composeReducer('orders', {
  getOrders,
  clearList,
}, initialState);
