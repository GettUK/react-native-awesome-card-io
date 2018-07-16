import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';
import { unionBy, omit, get } from 'lodash';
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

const initialMeta = {};

export const initialState = {
  tempMeta: initialMeta,
  meta: initialMeta,
  include: initialList,
  exclude: initialList,
  previous: initialList
};

const toLocatingStatus = order => (order.status === ORDER_RECEIVED_STATUS && order.asap
  ? { ...order, status: LOCATING_STATUS } : order);

const getOrders = (state, { data, orderType, nextPageRequired }) => {
  const result = nextPageRequired ? unionBy(state[orderType].items, data.items, 'id') : data.items;
  return update(state, orderType, {
    items: result.map(toLocatingStatus),
    meta: data.pagination
  });
};

const setFilter = (state, { payload: { path, value } }) => update(state, path, value);

const clearFilter = (state, { payload: { path, type } }) => {
  const isDateRange = type === 'dateRange';
  const pathData = get(state, path);
  return update(state, path, isDateRange ? omit(pathData, ['from', 'to']) : initialMeta);
};

const initialOrdersList = (state, { orderType }) => update(state, orderType, initialList);

const clearOrdersList = () => initialState;

export default composeReducer(
  'orders',
  {
    getOrders,
    initialOrdersList,
    clearOrdersList,
    setFilter,
    clearFilter
  },
  initialState
);
