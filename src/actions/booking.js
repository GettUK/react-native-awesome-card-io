import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';

import { get, post, put } from 'utils';
import faye from 'utils/faye';

import { goToActiveOrderScene, goToPreorderScene } from 'actions/ui/navigation';
import { changeFields } from 'actions/ui/map';

const TYPES = createTypes('booking', [
  'createBookingStart',
  'createBookingSuccess',
  'createBookingFailure',
  'changeOrderStatus',
  'cancelOrderStart',
  'cancelOrderSuccess',
  'getFormDataSuccess',
  'getVehiclesStart',
  'getVehiclesSuccess',
  'getVehiclesFailure',
  'toggleVisibleModal',
  'setDriver'
]);

export const orderStatusSubscribe = channel => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  faye.on(channel, ({ data }) => {
    if (data.indicator) {
      if (data.status === 'on_the_way') {
        get(`/bookings/${currentOrder.id}`)
          .then(({ data }) => {
            dispatch(batchActions([
              { type: TYPES.setDriver, payload: data.driverDetails.info },
              { type: TYPES.changeOrderStatus, data }
            ]));
          });
      } else {
        dispatch({ type: TYPES.changeOrderStatus, data });
      }
    }
  });
};

export const createBooking = order => (dispatch) => {
  dispatch({ type: TYPES.createBookingStart });

  return post('/bookings', order)
    .then(({ data }) => {
      dispatch({ type: TYPES.createBookingSuccess, payload: data });

      dispatch(goToActiveOrderScene());

      dispatch(orderStatusSubscribe(data.channel));

      return data;
    })
    .catch((errors) => {
      dispatch({ type: TYPES.createBookingFailure, payload: errors });
    });
};

export const removeOrderStatusSubscription = () => (dispatch) => {
  faye.closeConnection();

  dispatch({ type: TYPES.changeOrderStatus, data: {} });
};

export const completeOrder = () => (dispatch) => {
  dispatch(goToPreorderScene());

  dispatch(removeOrderStatusSubscription());

  dispatch(batchActions([
    { type: TYPES.setDriver, payload: {} },
    { type: TYPES.cancelOrderSuccess }
  ]));
};

export const cancelOrder = () => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  if (!currentOrder.id) dispatch(completeOrder());

  dispatch({ type: TYPES.cancelOrderStart });

  return put(`/bookings/${currentOrder.id}/cancel`, { cancellation_fee: false })
    .then(() => {
      dispatch(completeOrder());
    });
};

export const getFormData = () => dispatch => (
  get('/bookings/new')
    .then(({ data }) => {
      dispatch({ type: TYPES.getFormDataSuccess, payload: data });
      return data;
    })
);

export const getVehicles = params => (dispatch) => {
  dispatch({ type: TYPES.getVehiclesStart });

  return post('/bookings/vehicles', params)
    .then(({ data }) => {
      dispatch({ type: TYPES.getVehiclesSuccess, payload: data });
      return data;
    }).catch(() => {
      dispatch(batchActions([
        { type: TYPES.getVehiclesFailure },
        changeFields({ quoteId: undefined, vehicleName: undefined })
      ]));
    });
};

export const toggleVisibleModal = name => ({ type: TYPES.toggleVisibleModal, payload: name });
