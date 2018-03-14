import { createTypes } from 'redux-compose-reducer';
import { get, post } from 'utils';
import { goToActiveOrderScene, goToPreorderScene } from 'actions/ui/navigation';
import { changeFields } from 'actions/ui/map';

const TYPES = createTypes('booking', [
  'createBookingStart',
  'createBookingSuccess',
  'createBookingFailure',
  'cancelOrder',
  'getFormDataSuccess',
  'getVehiclesStart',
  'getVehiclesSuccess',
  'getVehiclesFailure',
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate',
  'changeTravelReason',
  'openSettingsModal',
  'closeSettingsModal'
]);

export const createBooking = booking => dispatch => {
  // booking = {
  //   ...booking,
  //   scheduledAt: booking.scheduledType === 'now' ? undefined : booking.scheduledAt.format()
  // };
  dispatch({ type: TYPES.createBookingStart });

  return post('/bookings', booking)
    .then(({ data }) => {
      dispatch({ type: TYPES.createBookingSuccess, payload: data });

      dispatch(goToActiveOrderScene());
      return data;
    })
    .catch(errors => {
      dispatch({ type: TYPES.createBookingFailure, payload: errors });
    });
};

export const cancelOrder = () => dispatch => {
  dispatch(goToPreorderScene());
  dispatch({ type: TYPES.cancelOrder });
};

export const getFormData = () => dispatch => (
  get('/bookings/new')
    .then(({ data }) => {
      dispatch({ type: TYPES.getFormDataSuccess, payload: data });
      return data;
    })
);

export const getVehicles = params => dispatch => {
  dispatch({ type: TYPES.getVehiclesStart });

  return post('/bookings/vehicles', params)
    .then(({ data }) => {
      dispatch({ type: TYPES.getVehiclesSuccess, payload: data });
      return data;
    }).catch(() => {
      dispatch({ type: TYPES.getVehiclesFailure });
      dispatch(changeFields({ quoteId: undefined, vehicleName: undefined }));
    });
};

export const changeTempMessageToDriver = (message) => (dispatch) => {
  dispatch({ type: TYPES.changeTempMessageToDriver, message });
};

export const applyMessageToDriver = () => (dispatch) => {
  dispatch({ type: TYPES.applyMessageToDriver });
};

export const changeBookingDate = (date) => (dispatch) => {
  dispatch({ type: TYPES.changeBookingDate, date });
};

export const changeTravelReason = (reasonId) => (dispatch) => {
  dispatch({ type: TYPES.changeTravelReason, reasonId });
};

export const openSettingsModal = () => (dispatch) => {
  dispatch({ type: TYPES.openSettingsModal });
};

export const closeSettingsModal = () => (dispatch) => {
  dispatch({ type: TYPES.closeSettingsModal });
};
