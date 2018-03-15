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
    isSettingsModalOpened: false,
    isPickerModalOpened: false
  },
  currentOrder: {
    busy: false
  },
  orderCreateError: null,
  orderState: {}
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

const getVehiclesSuccess = (state, { payload: { vehicles, distance, duration } }) => (
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

const createBookingStart = state => (
  update(state, {
    currentOrder: { busy: true },
    orderCreateError: null
  })
);

const createBookingSuccess = (state, { payload }) => (
  update(state, {
    currentOrder: { ...payload, busy: false }
  })
);

const createBookingFailure = (state, { payload }) => (
  update(state, {
    currentOrder: { busy: false },
    orderCreateError: payload
  })
);

const cancelOrder = (state) => {
  return update(state, {
    currentOrder: {},
    orderCreateError: null
  });
};

const changeOrderStatus = (state, { data }) => {
  return update(state, 'orderState', data);
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

const toggleVisibleModal = (state, { payload }) => (
  update(state, `meta.${payload}`, !state.meta[payload])
);

export default composeReducer('booking', {
  getFormDataSuccess,
  getVehiclesStart,
  getVehiclesSuccess,
  getVehiclesFailure,
  changeTempMessageToDriver,
  applyMessageToDriver,
  changeBookingDate,
  changeTravelReason,
  toggleVisibleModal,
  createBookingStart,
  createBookingSuccess,
  createBookingFailure,
  cancelOrder,
  changeOrderStatus
}, initialState);
