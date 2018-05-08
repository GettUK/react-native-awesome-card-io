import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  validatedReferences: [],
  formData: {
    vehicles: {
      loading: false,
      loaded: false,
      data: []
    },
    busy: false
  },
  modals: {
    settings: false,
    picker: false
  },
  currentOrder: {
    busy: false
  },
  orderCreateError: null
};

const getFormDataStart = state => (
  update(state, 'formData.busy', true)
);

const getFormDataSuccess = (state, { payload }) => (
  update(state, 'formData', { ...initialState.formData, ...payload, busy: false })
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
    orderCreateError: null,
    canceledByExternal: false,
    canceledByUser: false
  })
);

const updateCurrentOrder = (state, { payload }) => (
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
    'currentOrder.busy': true,
    orderCreateError: null
  })
);

const cancelOrderSuccess = state => (
  update(state, {
    currentOrder: { busy: false },
    orderCreateError: null
  })
);

const canceledByExternal = state => (
  update(state, {
    canceledByExternal: true,
    canceledByUser: false
  })
);

const canceledByUser = state => (
  update(state, {
    canceledByExternal: false,
    canceledByUser: true
  })
);

const setDriver = (state, { payload }) => (
  update(state, 'currentOrder.driverDetails', payload)
);

const changeOrderStatus = (state, { data }) => (
  update(state, { 'currentOrder.serviceId': data.serviceId, 'currentOrder.status': data.status })
);

const changeDriverPosition = (state, { payload }) => (
  update(state, { 'currentOrder.driverDetails.location': payload })
);

const toggleVisibleModal = (state, { payload }) => (
  update(state, `modals.${payload}`, !state.modals[payload])
);

const changeDriverRating = (state, { payload }) => (
  update(state, 'currentOrder.tempDriverRating', payload)
);

const changeDriverRatingSuccess = state => (
  update(state, {
    'currentOrder.rateable': false,
    'currentOrder.driverDetails.tripRating': state.currentOrder.tempDriverRating,
    'currentOrder.tempDriverRating': null
  })
);

const clearCurrentOrder = state => (
  update(state, 'currentOrder', initialState.currentOrder)
);

const clearBooking = () => initialState;

export default composeReducer('booking', {
  getFormDataStart,
  getFormDataSuccess,
  getVehiclesStart,
  getVehiclesSuccess,
  getVehiclesFailure,
  toggleVisibleModal,
  createBookingStart,
  updateCurrentOrder,
  createBookingFailure,
  cancelOrderStart,
  cancelOrderSuccess,
  canceledByExternal,
  canceledByUser,
  changeOrderStatus,
  changeDriverPosition,
  setDriver,
  changeDriverRating,
  changeDriverRatingSuccess,
  clearCurrentOrder,
  clearBooking
}, initialState);
