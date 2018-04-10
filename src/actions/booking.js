import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';

import { get, post, put } from 'utils';
import faye from 'utils/faye';
import { FINAL_STATUSES, CANCELLED_STATUS, DRIVER_ON_WAY } from 'utils/orderStatuses';

import { goToActiveOrderScene, goToPreOrderScene, goToCompletedOrderScene } from 'actions/ui/navigation';
import { changeFields } from 'actions/ui/map';

import {
  preparePaymentType,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';

const TYPES = createTypes('booking', [
  'createBookingStart',
  'updateCurrentOrder',
  'createBookingFailure',
  'changeOrderStatus',
  'cancelOrderStart',
  'cancelOrderSuccess',
  'canceledByExternal',
  'canceledByUser',
  'getFormDataSuccess',
  'getVehiclesStart',
  'getVehiclesSuccess',
  'getVehiclesFailure',
  'toggleVisibleModal',
  'setDriver',
  'clearCurrentOrder',
  'clearBooking'
]);

const getAuthorOfCancellation = () => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  return get(`/bookings/${currentOrder.id}`)
    .then(({ data }) => {
      if (data.passenger === data.cancelledByName) {
        dispatch({ type: TYPES.canceledByUser });
      } else {
        dispatch({ type: TYPES.canceledByExternal });
      }
      return data;
    });
};

const removeOrderStatusSubscription = () => {
  faye.closeConnection();
};

export const orderStatusSubscribe = channel => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  faye.on(channel, ({ data }) => {
    if (data.indicator) {
      if (data.status === DRIVER_ON_WAY) {
        get(`/bookings/${currentOrder.id}`)
          .then(({ data: driverData }) => {
            dispatch(batchActions([
              {
                type: TYPES.setDriver,
                payload: driverData.driverDetails
              },
              { type: TYPES.changeOrderStatus, data }
            ]));
          });
      } else if (FINAL_STATUSES.includes(data.status)) {
        dispatch(goToCompletedOrderScene());

        if (data.status === CANCELLED_STATUS) {
          dispatch(getAuthorOfCancellation());
        }

        dispatch({ type: TYPES.changeOrderStatus, data });

        removeOrderStatusSubscription();
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
      dispatch({ type: TYPES.updateCurrentOrder, payload: data });

      dispatch(goToActiveOrderScene());

      dispatch(orderStatusSubscribe(data.channel));

      return data;
    })
    .catch((errors) => {
      dispatch({ type: TYPES.createBookingFailure, payload: errors });
      return Promise.reject(errors);
    });
};

export const setActiveBooking = id => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  if (currentOrder.id === id) return Promise.resolve();

  return get(`/bookings/${id}`)
    .then(({ data }) => {
      dispatch({ type: TYPES.updateCurrentOrder, payload: data });

      if (FINAL_STATUSES.includes(data.status)) {
        dispatch(goToCompletedOrderScene());
      } else {
        dispatch(goToActiveOrderScene());

        dispatch(orderStatusSubscribe(data.channel));
      }

      return data;
    });
};

export const clearCurrentOrder = () => (dispatch) => {
  removeOrderStatusSubscription();
  dispatch(goToPreOrderScene());
  dispatch({ type: TYPES.clearCurrentOrder });
};

export const cancelOrder = () => (dispatch, getState) => {
  const { bookings: { currentOrder } } = getState();

  dispatch({ type: TYPES.cancelOrderStart });

  return put(`/bookings/${currentOrder.id}/cancel`, { cancellation_fee: false })
    .then(async () => {
      const data = await dispatch(getAuthorOfCancellation());
      dispatch({ type: TYPES.updateCurrentOrder, payload: data });

      dispatch(goToCompletedOrderScene());

      removeOrderStatusSubscription();
    });
};

export const getFormData = () => (dispatch, getState) => (
  get('/bookings/new')
    .then(({ data }) => {
      if (!getState().ui.map.fields.paymentMethod) {
        const memberId = getState().session.result.memberId;
        const passenger = data.passenger || data.passengers.find(passenger => passenger.id === memberId);
        const cards = (passenger || {}).paymentCards || [];

        const availablePayments = data.paymentTypes.filter(type => (
          type !== 'passenger_payment_card' && type !== 'passenger_payment_card_periodic'
        ));

        let paymentType = '';

        if (!availablePayments.length) {
          const paymentCard = passenger.paymentCards.find(card => card.default) || passenger.paymentCards[0];

          paymentType = `${paymentCard.type}_payment_card:${paymentCard.id}`;
        } else {
          paymentType = preparePaymentType({ payment: availablePayments[0], cards });
        }

        dispatch(changeFields(paymentTypeToAttrs(paymentType)));
      }

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

export const clearBooking = () => ({ type: TYPES.clearBooking });
