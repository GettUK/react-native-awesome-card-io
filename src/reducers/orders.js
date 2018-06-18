import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';
import { unionBy } from 'lodash';
import {
  ORDER_RECEIVED_STATUS,
  LOCATING_STATUS
} from 'utils/orderStatuses';

const initialList = {
  items: [],
  meta: {
    total: 0,
    current: 0
  }
};

export const initialState = {
  include: initialList,
  exclude: initialList,
  previous: initialList
};

const toLocatingStatus = order => (order.status === ORDER_RECEIVED_STATUS && order.asap
  ? { ...order, status: LOCATING_STATUS } : order);

const getOrders = (state, { data, orderType }) => update(state, orderType, {
  items: unionBy(state[orderType].items, data.items, 'id').map(toLocatingStatus),
  meta: data.pagination
});

const clearOrdersList = () => initialState;

export default composeReducer(
  'orders',
  {
    getOrders,
    clearOrdersList
  },
  initialState
);
