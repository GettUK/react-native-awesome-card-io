import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';

import { get, post, put, referencesLocalErrors } from 'utils';
import { isEmpty, reject } from 'lodash';
import faye from 'utils/faye';
import {
  FINAL_STATUSES,
  DRIVER_ON_WAY,
  IN_PROGRESS_STATUS,
  ARRIVED_STATUS,
  ORDER_RECEIVED_STATUS,
  LOCATING_STATUS
} from 'utils/orderStatuses';

import { goToActiveOrderScene, goToOrderCreatingScene, goToCompletedOrderScene } from 'actions/ui/navigation';

import {
  preparePaymentType,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';

const TYPES = createTypes('booking', [
  'createBookingStart',
  'updateCurrentOrder',
  'createBookingFailure',
  'changeOrderStatus',
  'changeDriverPosition',
  'cancelOrderStart',
  'cancelOrderSuccess',
  'getFormDataStart',
  'getFormDataSuccess',
  'removeFields',
  'changeFields',
  'changeAddress',
  'changeReference',
  'changePassengerId',
  'changeTravelReasonId',
  'changePaymentMethodData',
  'setReferenceErrors',
  'resetBookingValues',
  'changeMessageToDriver',
  'changeFlight',
  'getVehiclesStart',
  'getVehiclesSuccess',
  'getVehiclesFailure',
  'toggleVisibleModal',
  'setDriver',
  'changeDriverRating',
  'changeDriverRatingReasons',
  'changeDriverRatingSuccess',
  'clearCurrentOrder',
  'clearBooking',
  'updateReferences'
]);

export const updateReferences = references => ({ type: TYPES.updateReferences, payload: references });

export const removeFields = fields => ({ type: TYPES.removeFields, payload: fields });

export const changeFields = fields => ({ type: TYPES.changeFields, payload: fields });

export const changeAddress = (address, meta) => ({ type: TYPES.changeAddress, payload: { address, meta } });

export const changeReference = reference => ({ type: TYPES.changeReference, payload: reference });

export const requestValidateReferences = () => (_, getState) =>
  post('bookings/validate_references', { bookerReferences: getState().booking.bookingForm.bookerReferences });

export const setReferenceErrors = errors => ({ type: TYPES.setReferenceErrors, payload: errors });

export const validateReferences = () => async (dispatch, getState) => {
  const { booking: { bookingForm: { bookerReferences } } } = getState();
  let errors = referencesLocalErrors(bookerReferences);

  if (isEmpty(errors)) {
    try {
      await dispatch(requestValidateReferences());
    } catch ({ response }) {
      errors = response.data.errors;
    }
  }

  dispatch(setReferenceErrors(errors));
  return errors;
};

export const resetBookingValues = () => ({ type: TYPES.resetBookingValues });

export const changeMessageToDriver = (message, touched = false) =>
  ({ type: TYPES.changeMessageToDriver, payload: { message, touched } });

export const changeFlight = (data, touched = false) =>
  ({ type: TYPES.changeFlight, payload: { data, touched } });

export const changePassengerId = (id, touched = false) =>
  ({ type: TYPES.changePassengerId, payload: { id, touched } });

export const changeTravelReasonId = (id, touched = false) =>
  ({ type: TYPES.changeTravelReasonId, payload: { id, touched } });

export const changePaymentMethodData = (data, touched = false) =>
  ({ type: TYPES.changePaymentMethodData, payload: { data, touched } });

export const saveMessageToDriver = () => (dispatch, getState) =>
  dispatch(changeFields({ messageToDriver: getState().booking.tempMessageToDriver.trim() }));

export const saveFlight = () => (dispatch, getState) => {
  const { flight } = getState().booking.tempFlight;

  dispatch(changeFields({ flight }));
};

export const savePassenger = () => (dispatch, getState) => {
  const {
    formData: { passengers },
    tempPassengerId,
    bookingForm: { defaultPaymentType }
  } = getState().booking;

  const { id, firstName, lastName, phone } = passengers.find(p => p.id === tempPassengerId);

  dispatch(changeFields({
    ...defaultPaymentType,
    passengerId: id,
    passengerName: `${firstName} ${lastName}`,
    passengerPhone: phone
  }));
};

let orderStatusSubscription = null;
let bookingInterval = null;

const removeOrderStatusSubscription = () => faye.cancelSubscription(orderStatusSubscription);

const orderReceivedStatusFlow = (data, delay) => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();
  const isAsapOrder = (data.asap || currentOrder.asap);

  if (data.status === ORDER_RECEIVED_STATUS && isAsapOrder) {
    setTimeout(() => {
      if (getState().booking.currentOrder.status === ORDER_RECEIVED_STATUS) {
        dispatch({ type: TYPES.changeOrderStatus, data: { ...data, status: LOCATING_STATUS } });
      }
    }, delay);
  }
};

const setBookingUpdater = id => (dispatch) => {
  bookingInterval = setInterval(() => {
    get(`/bookings/${id}`)
      .then(({ data }) => {
        dispatch({ type: TYPES.updateCurrentOrder, payload: data });
      });
  }, 3000);
};

export const orderStatusSubscribe = channel => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();

  orderStatusSubscription = faye.on(channel, ({ data }) => {
    if (data.status === ARRIVED_STATUS) {
      clearInterval(bookingInterval);
    }

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

        dispatch(setBookingUpdater(currentOrder.id));
      } else if (FINAL_STATUSES.includes(data.status)) {
        dispatch(goToCompletedOrderScene());

        dispatch({ type: TYPES.changeOrderStatus, data });

        removeOrderStatusSubscription();
      } else {
        dispatch(orderReceivedStatusFlow(data, 2000));
        dispatch({ type: TYPES.changeOrderStatus, data });
      }
    } else if ((data.status === DRIVER_ON_WAY || data.status === IN_PROGRESS_STATUS) && data.driver.lat) {
      dispatch({ type: TYPES.changeDriverPosition, payload: data.driver });
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
  const { booking: { currentOrder } } = getState();

  if (currentOrder.id === id) return Promise.resolve();

  return get(`/bookings/${id}`)
    .then(({ data }) => {
      dispatch({ type: TYPES.updateCurrentOrder, payload: data });

      if (data.status === DRIVER_ON_WAY) {
        dispatch(setBookingUpdater(id));
      }

      if (FINAL_STATUSES.includes(data.status)) {
        dispatch(goToCompletedOrderScene());
      } else {
        dispatch(goToActiveOrderScene());

        dispatch(orderReceivedStatusFlow(data, 100));
        dispatch(orderStatusSubscribe(data.channel));
      }

      return data;
    });
};

export const clearCurrentOrder = () => (dispatch) => {
  removeOrderStatusSubscription();
  dispatch(goToOrderCreatingScene());
  dispatch({ type: TYPES.clearCurrentOrder });
  clearInterval(bookingInterval);
};

export const cancelOrder = () => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();

  dispatch({ type: TYPES.cancelOrderStart });

  return put(`/bookings/${currentOrder.id}/cancel`, { cancellation_fee: false })
    .then(() => {
      dispatch({ type: TYPES.cancelOrderSuccess });
      dispatch(goToCompletedOrderScene());

      removeOrderStatusSubscription();
    });
};

export const sendCancelOrderReason = reason => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();

  return put(`/bookings/${currentOrder.id}/cancellation_reason`, { cancellation_reason: reason });
};

export const getFormData = () => (dispatch, getState) => {
  dispatch({ type: TYPES.getFormDataStart });

  return get('/bookings/new')
    .then(({ data }) => {
      if (!getState().booking.bookingForm.paymentMethod) {
        const memberId = getState().session.user.memberId;
        const passenger = data.passenger || data.passengers.find(passenger => passenger.id === memberId);
        const cards = (passenger || {}).paymentCards || [];

        const availablePayments = data.paymentTypes.filter(type => (
          type !== 'passenger_payment_card' && type !== 'passenger_payment_card_periodic'
        ));

        let paymentType = '';

        if (!availablePayments.length) {
          const paymentCard = passenger.paymentCards.find(card => card.default) || passenger.paymentCards[0];
          if (paymentCard) paymentType = `${paymentCard.type}_payment_card:${paymentCard.id}`;
        } else {
          paymentType = preparePaymentType({ payment: availablePayments[0], cards });
        }

        const paymentAttrs = paymentTypeToAttrs(paymentType);

        dispatch(changeFields({ ...paymentAttrs, defaultPaymentType: paymentAttrs }));
      }

      dispatch({ type: TYPES.getFormDataSuccess, payload: data });

      dispatch({ type: TYPES.updateReferences, payload: data.bookingReferences });

      return data;
    });
};

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

export const changeDriverRating = rating => (dispatch, getState) => {
  const { tempDriverRatingReasons } = getState().booking.currentOrder;

  dispatch({
    type: TYPES.changeDriverRating,
    payload: { rating, ratingReasons: rating <= 4 ? (tempDriverRatingReasons || []) : [] }
  });
};

export const changeDriverRatingReasons = name => (dispatch, getState) => {
  const { tempDriverRatingReasons } = getState().booking.currentOrder;
  let ratingReasons = (tempDriverRatingReasons && tempDriverRatingReasons) || [];

  if (ratingReasons.find(reasonName => (reasonName === name))) {
    ratingReasons = reject(ratingReasons, reasonName => (reasonName === name));
  } else {
    ratingReasons.push(name);
  }
  dispatch({ type: TYPES.changeDriverRatingReasons, payload: ratingReasons });
};

export const rateDriver = () => (dispatch, getState) => {
  const { id, tempDriverRating, tempDriverRatingReasons } = getState().booking.currentOrder;
  return put(`/bookings/${id}/rate`, {
    rating: tempDriverRating,
    rating_reasons: (tempDriverRatingReasons && tempDriverRatingReasons) || []
  })
    .then(() => dispatch({ type: TYPES.changeDriverRatingSuccess }));
};

export const clearBooking = () => ({ type: TYPES.clearBooking });
