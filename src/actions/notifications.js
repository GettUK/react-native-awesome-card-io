import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('notifications', [
  'getNotifications',
  'clearNotificationsList',
  'markAsRead',
  'clearUnread'
]);

export const markAsRead = ids => (dispatch) => {
  dispatch({ type: TYPES.markAsRead, ids });
};

export const getNotifications = () => dispatch => (
  get('/messages/recent')
    .then((res) => {
      dispatch({ type: TYPES.getNotifications, data: res.data });

      return res.data;
    })
);

export const clearUnread = () => dispatch => dispatch({ type: TYPES.clearUnread });

export const clearNotificationsList = () => dispatch => dispatch({ type: TYPES.clearNotificationsList });

