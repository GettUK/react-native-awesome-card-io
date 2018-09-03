import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  items: [],
  unreadCounter: 0,
  readMessagesIds: {}
};

const updateUnread = (readMessagesIds, items) => {
  let unreadCounter = 0;
  items.forEach((item) => {
    if (!readMessagesIds[item.id]) {
      unreadCounter += 1;
    }
  });
  return unreadCounter;
};

const getNotifications = (state, { data: { items } }) =>
  update(state, {
    items,
    unreadCounter: updateUnread(state.readMessagesIds, items)
  });

const markAsRead = (state, { ids }) => {
  const readMessagesIds = {
    ...state.readMessagesIds,
    ...ids
  };
  const newState = {
    readMessagesIds,
    unreadCounter: updateUnread(readMessagesIds, state.items)
  };
  return update(state, newState);
};

const clearUnread = state => update(state, initialState);

const clearNotificationsList = state => update(state, { items: [] });

export default composeReducer(
  'notifications',
  {
    getNotifications,
    clearNotificationsList,
    markAsRead,
    clearUnread
  },
  initialState
);
