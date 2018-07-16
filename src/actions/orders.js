import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('orders', [
  'getOrders',
  'initialOrdersList',
  'clearOrdersList',
  'setFilter',
  'clearFilter'
]);

export const getOrders = (query, type, nextPageRequired) => dispatch =>
  get('/bookings', query)
    .then((res) => {
      dispatch({ type: TYPES.getOrders, data: res.data, orderType: type, nextPageRequired });

      return res.data;
    });

export const clearOrdersList = () => ({ type: TYPES.clearOrdersList });

export const initialOrdersList = orderType => ({ type: TYPES.initialOrdersList, orderType });

export const setFilter = (path, value) => ({ type: TYPES.setFilter, payload: { path, value } });

export const clearFilter = (path, type) => ({ type: TYPES.clearFilter, payload: { path, type } });
