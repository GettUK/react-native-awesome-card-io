import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  new: {
    messageToDriver: '',
    temp: {}
  }
};

const changeTempMessageToDriver = (state, { message }) => {
  return update(state, 'new.temp.messageToDriver', message);
};

const applyMessageToDriver = (state) => {
  return update(state, 'new.messageToDriver', state.new.temp.messageToDriver);
};

export default composeReducer('booking', {
  changeTempMessageToDriver,
  applyMessageToDriver
}, initialState);
