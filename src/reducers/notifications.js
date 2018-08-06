import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  items: []
};

const getNotifications = (state, { data: items }) => update(state, items);

const clearNotificationsList = () => initialState;

export default composeReducer(
  'notifications',
  {
    getNotifications,
    clearNotificationsList
  },
  initialState
);
