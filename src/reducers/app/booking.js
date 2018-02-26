import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  new: {
    messageToDriver: '',
    date: new Date(),
    temp: {}
  }
};

const changeTempMessageToDriver = (state, { message }) => {
  return update(state, 'new.temp.messageToDriver', message);
};

const applyMessageToDriver = (state) => {
  return update(state, 'new.messageToDriver', state.new.temp.messageToDriver);
};

const changeBookingDate = (state, { date }) => {
  return update(state, 'new.date', date);
};

export default composeReducer('booking', {
  changeTempMessageToDriver,
  applyMessageToDriver,
  changeBookingDate
}, initialState);
