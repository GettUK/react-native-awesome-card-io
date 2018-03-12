import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  validatedReferences: [],
  formData: {
    vehicles: {
      loading: false,
      loaded: false,
      data: []
    }
  },
  new: {
    messageToDriver: '',
    date: new Date(),
    travelReason: undefined,
    temp: {}
  },
  meta: {
    isSettingsModalOpened: false
  },
  currentOrder: {},
  orderCreateError: null
};

const getFormDataSuccess = (state, { payload }) => (
  update(state, 'formData', { ...initialState.formData, ...payload })
);

const getVehiclesStart = state => (
  update.assign(state, 'formData.vehicles', {
    loading: true,
    loaded: false
  })
);

const getVehiclesSuccess = (state, {payload: { vehicles, distance, duration }}) => (
  update(state, 'formData.vehicles', {
    data: vehicles,
    loading: false,
    loaded: true,
    failed: false,
    distance,
    duration
  })
);

const getVehiclesFailure = state => (
  update(state, 'formData.vehicles', { data: [], loading: false, loaded: true, failed: true })
);

const createBookingStart = (state) => {
  return update(state, 'orderCreateError', null);
};

const createBookingSuccess = (state, { payload }) => {
  return update(state, {
    currentOrder: payload,
    orderCreateError: null
  });
};

const createBookingFailure = (state, { payload }) => {
  return update(state, {
    currentOrder: {},
    orderCreateError: payload
  });
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

const changeTravelReason = (state, { reasonId }) => {
  return update(state, 'new.travelReason', reasonId);
};

const openSettingsModal = (state) => {
  return update(state, 'meta.isSettingsModalOpened', true);
};

const closeSettingsModal = (state) => {
  return update(state, 'meta.isSettingsModalOpened', false);
};

export default composeReducer('booking', {
  getFormDataSuccess,
  getVehiclesStart,
  getVehiclesSuccess,
  getVehiclesFailure,
  changeTempMessageToDriver,
  applyMessageToDriver,
  changeBookingDate,
  changeTravelReason,
  openSettingsModal,
  closeSettingsModal,
  createBookingStart,
  createBookingSuccess,
  createBookingFailure
}, initialState);
