import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';
import { isUndefined, omit } from 'lodash';

export const initialState = {
  formData: {
    busy: false
  },
  bookingForm: {
    scheduledAt: null,
    scheduledType: 'now',
    travelReasonId: '',
    bookerReferences: [],
    bookerReferencesErrors: {}
  },
  vehicles: {
    loading: false,
    loaded: false,
    data: []
  },
  modals: {
    settings: false,
    picker: false
  },
  currentOrder: {
    busy: false
  },
  orderCreateError: null,
  tempMessageToDriver: ''
};

const getFormDataStart = state => (
  update(state, 'formData.busy', true)
);

const getFormDataSuccess = (state, { payload }) => (
  update.assign(state, 'formData', { ...payload, busy: false })
);

const removeFields = (state, { payload }) => (
  update(state, 'bookingForm', omit(state.bookingForm, payload))
);

const changeFields = (state, { payload }) => (
  update.assign(state, 'bookingForm', payload)
);

const changeAddress = (state, { payload: { address, meta } }) => {
  if (meta.type !== 'stops') {
    return update(state, `bookingForm.${meta.type}`, address);
  } else if (isUndefined(meta.index)) {
    let processedState = state;
    if (!state.bookingForm.stops) {
      processedState = update(state, 'bookingForm.stops', []);
    }
    return update.push(processedState, 'bookingForm.stops', address);
  }
  return update.with(state, 'bookingForm.stops', old => old.map((s, i) => (i === meta.index ? address : s)));
};

const changeReference = (state, { payload }) =>
  update(state, {
    [`bookingForm.bookerReferences.{id:${payload.id}}.value`]: payload.value,
    'bookingForm.bookerReferencesErrors': {}
  });

const setReferenceErrors = (state, { payload }) =>
  update(state, 'bookingForm.bookerReferencesErrors', payload);

const resetBookingValues = state =>
  update(state, {
    bookingForm: update.assign({
      // todo use initial state
      ...state.bookingForm.defaultPaymentType,
      bookerReferences: state.formData.bookingReferences.map(r => ({ ...r, bookingReferenceId: r.id })),
      bookerReferencesErrors: {},
      scheduledType: 'now',
      scheduledAt: null,
      message: state.formData.defaultDriverMessage
    }),
    vehicles: initialState.vehicles
  });

const changeMessageToDriver = (state, { payload }) =>
  update(state, { tempMessageToDriver: payload.message, messageToDriverTouched: payload.touched });

const changeFlight = (state, { payload }) =>
  update(state, { tempFlight: payload.data, flightTouched: payload.touched });


const getVehiclesStart = state => (
  update.assign(state, 'vehicles', {
    loading: true,
    loaded: false
  })
);

const getVehiclesSuccess = (state, { payload: { vehicles, distance, duration } }) => (
  update(state, 'vehicles', {
    data: vehicles,
    loading: false,
    loaded: true,
    failed: false,
    distance,
    duration
  })
);

const getVehiclesFailure = state => (
  update(state, 'vehicles', { data: [], loading: false, loaded: true, failed: true })
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
  update.assign(state, 'currentOrder', {
    serviceId: data.serviceId,
    status: data.status,
    indicatedStatus: data.status
  })
);

const changeDriverPosition = (state, { payload }) => (
  update(state, { 'currentOrder.driverDetails.location': payload })
);

const toggleVisibleModal = (state, { payload }) => (
  update(state, `modals.${payload}`, !state.modals[payload])
);

const changeDriverRating = (state, { payload: { rating, ratingReasons } }) => (
  update(state, {
    'currentOrder.tempDriverRating': rating,
    'currentOrder.tempDriverRatingReasons': ratingReasons
  })
);

const changeDriverRatingReasons = (state, { payload }) => (
  update(state, 'currentOrder.tempDriverRatingReasons', payload)
);

const changeDriverRatingSuccess = state => (
  update(state, {
    'currentOrder.rateable': false,
    'currentOrder.driverDetails.tripRating': state.currentOrder.tempDriverRating,
    'currentOrder.tempDriverRating': null,
    'currentOrder.tempDriverRatingReasons': []
  })
);

const saveReceiptPath = (state, { payload }) => (
  update(state, 'currentOrder.receiptPath', payload)
);

const clearCurrentOrder = state => (
  update(state, 'currentOrder', initialState.currentOrder)
);

const clearBooking = () => initialState;

export default composeReducer('booking', {
  getFormDataStart,
  getFormDataSuccess,
  removeFields,
  changeFields,
  changeAddress,
  changeReference,
  setReferenceErrors,
  resetBookingValues,
  changeMessageToDriver,
  changeFlight,
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
  changeDriverRatingReasons,
  changeDriverRatingSuccess,
  saveReceiptPath,
  clearCurrentOrder,
  clearBooking
}, initialState);
