import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('orders', [
  'getOrders',
  'clearOrdersList'
]);

export const getOrders = (query, type) => dispatch =>
  get('/bookings', query)
    .then((res) => {
      dispatch({ type: TYPES.getOrders, data: res.data, orderType: type });

      return res.data;
    });

export const clearOrdersList = () => ({ type: TYPES.clearOrdersList });

