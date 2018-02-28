import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  formData: {},
  new: {
    messageToDriver: '',
    date: new Date(),
    travelReason: undefined,
    temp: {}
  },
  currentOrder: {},
  orderCreateError: null
};

const getFormDataSuccess = (state, { data }) => {
  return update(state, 'formData', { ...initialState.formData, ...data });
};

const createOrderStarted = (state) => {
  return update(state, 'orderCreateError', null);
}

const createOrderSuccess = (state, { data }) => {
  return update(state, {
    currentOrder: data,
    orderCreateError: {}
  });
}

const createOrderError = (state, { error }) => {
  return update(state, {
    currentOrder: {},
    orderCreateError: error
  });
}

const changeTempMessageToDriver = (state, { message }) => {
  return update(state, 'new.temp.messageToDriver', message);
};

const applyMessageToDriver = (state) => {
  return update(state, 'new.messageToDriver', state.new.temp.messageToDriver);
};

const changeBookingDate = (state, { date }) => {
  return update(state, 'new.date', date);
};

const changeTravelReason = (state, { reasonId }) => {
  return update(state, 'new.travelReason', reasonId);
};

export default composeReducer('booking', {
  getFormDataSuccess,
  changeTempMessageToDriver,
  applyMessageToDriver,
  changeBookingDate,
  changeTravelReason
}, initialState);
