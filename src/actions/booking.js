import { createTypes } from 'redux-compose-reducer';

import { get, post, put } from 'utils';
import faye from 'utils/faye';

import { goToActiveOrderScene, goToPreorderScene } from 'actions/ui/navigation';
import { changeFields } from 'actions/ui/map';

const TYPES = createTypes('booking', [
  'createBookingStart',
  'createBookingSuccess',
  'createBookingFailure',
  'changeOrderStatus',
  'cancelOrder',
  'getFormDataSuccess',
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate',
  'changeTravelReason',
  'openSettingsModal',
  'closeSettingsModal',
  'getVehiclesStart',
  'getVehiclesSuccess',
  'getVehiclesFailure'
]);

export const createBooking = (order) => (dispatch) => {
  dispatch({ type: TYPES.createBookingStart });

  return post('/bookings', order)
    .then(({ data }) => {
      dispatch({ type: TYPES.createBookingSuccess, payload: data });

      dispatch(goToActiveOrderScene());

      dispatch(orderStatusSubscribe(data.channel));

      return data;
    })
    .catch((error) => {
      dispatch({ type: TYPES.createBookingFailure, error });
    });
};

export const orderStatusSubscribe = (channel) => (dispatch) => {
  faye.on(channel, ({ data }) => {
    if (data.indicator) {
      dispatch({ type: TYPES.changeOrderStatus, data });
    }
  });
};

export const removeOrderStatusSubscription = () => (dispatch) => {
  faye.closeConnection();

  dispatch({ type: TYPES.changeOrderStatus, data: {} });
}

export const cancelOrder = () => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  return put(`/bookings/${currentOrder.id}/cancel`, { cancellation_fee: false })
    .then(res => {
      dispatch(completeOrder());
    });
}

export const completeOrder = () => (dispatch) => {
  dispatch(goToPreorderScene());

  dispatch(removeOrderStatusSubscription())

  dispatch({ type: TYPES.cancelOrder });
}

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
