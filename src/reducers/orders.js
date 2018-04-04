import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';
import { unionBy } from 'lodash';

const initialList = {
  items: [],
  meta: {
    total: 0,
    current: 0
  }
};

export const initialState = {
  active: initialList,
  previous: initialList
};

const getOrders = (state, { data, orderType }) => update(state, orderType, {
  items: unionBy(state[orderType].items, data.items, 'id'),
  meta: data.pagination
});

const clearList = () => initialState;

export default composeReducer(
  'orders',
  {
    getOrders,
    clearList
  },
  initialState
);
