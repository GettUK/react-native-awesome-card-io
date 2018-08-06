import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('notifications', [
  'getNotifications',
  'clearNotificationsList'
]);

export const getNotifications = query => dispatch => (
  get('/messages/recent', query)
    .then((res) => {
      dispatch({ type: TYPES.getNotifications, data: res.data });

      return res.data;
    })
);

export const clearNotificationsList = () => ({ type: TYPES.clearNotificationsList });

