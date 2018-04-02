import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('orders', [
  'getOrders',
  'clearList'
]);

export const getOrders = query => dispatch =>
  get('/bookings', query)
    .then((res) => {
      dispatch({ type: TYPES.getOrders, data: res.data });
      return res.data;
    });

export const clearList = () => ({ type: TYPES.clearList });

