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
  modals: {
    settings: false,
    picker: false
  },
  currentOrder: {
    busy: false
  },
  orderCreateError: null,
  orderState: {},
  driver: {}
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

const cancelOrderStart = state => (
  update(state, {
    currentOrder: { busy: true },
    orderCreateError: null
  })
);

const cancelOrderSuccess = state => (
  update(state, {
    currentOrder: {},
    orderCreateError: null
  })
);

const setDriver = (state, { payload }) => (
  update(state, 'driver', payload)
);

const changeOrderStatus = (state, { data }) => (
  update(state, 'orderState', data)
);

const toggleVisibleModal = (state, { payload }) => (
  update(state, `modals.${payload}`, !state.modals[payload])
);

export default composeReducer('booking', {
  getFormDataSuccess,
  getVehiclesStart,
  getVehiclesSuccess,
  getVehiclesFailure,
  toggleVisibleModal,
  createBookingStart,
  createBookingSuccess,
  createBookingFailure,
  cancelOrderStart,
  cancelOrderSuccess,
  changeOrderStatus,
  setDriver
}, initialState);
