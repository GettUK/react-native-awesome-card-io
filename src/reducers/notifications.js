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

// used to clear unused ids from cache(maximum cache capacity is length of items array)
const clearUnread = (state) => {
  const reducedIds = {};
  state.items.forEach((item) => {
    if (state.readMessagesIds[item.id]) {
      reducedIds[item.id] = item.id;
    }
  });
  return update(state, { readMessagesIds: reducedIds });
};

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
