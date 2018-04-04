import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';
import { unionBy } from 'lodash';

export const initialState = {
  items: []
};

const getOrders = (state, { data }) => update(state, 'items', unionBy(state.items, data.items, 'id'));

const clearList = () => initialState;

export default composeReducer(
  'orders',
  {
    getOrders,
    clearList
  },
  initialState
);
