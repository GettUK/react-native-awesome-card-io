import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { isEmpty, reject, snakeCase, omit } from 'lodash';

import {
  get, post, put,
  referencesLocalErrors,
  bookingFieldsToReset,
  messagePrefixes,
  separateMessage,
  getFavouriteAddressMessage,
  formatMessage,
  getStopPoints
} from 'utils';
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
import { getCurrentUser } from 'actions/session';

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
  'setReferenceErrors',
  'resetBookingValues',
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
  'saveAvailableCarsScroll',
  'clearBooking',
  'updateReferences',
  'changeMessageModified',
  'setFutureOrderId',
  'changeSuggestedAddresses',
  'resetSuggestedAddresses',
  'loadingSuggestedAddressesError',
  'startLoadingSuggestedAddresses',
  'restoreCurrentOrder'
]);

export const restoreCurrentOrder = payload => ({ type: TYPES.restoreCurrentOrder, payload });

export const updateReferences = references => ({ type: TYPES.updateReferences, payload: references });

export const removeFields = fields => ({ type: TYPES.removeFields, payload: fields });

export const changeFields = fields => ({ type: TYPES.changeFields, payload: fields });

export const asyncChangeFields = fields => dispatch => Promise.resolve(dispatch(changeFields(fields)));

export const changeMessageModified = (modified = false) => ({ type: TYPES.changeMessageModified, modified });

export const changeMessageToDriver = (message, modified = false) => (dispatch) => {
  if (modified) dispatch(changeMessageModified(true));

  return dispatch(changeFields({ message }));
};

const getMessageForAddress = ({ message, address = {}, meta, booking, passenger }) => {
  const { formData: { defaultPickupAddress = {}, defaultDriverMessage } } = booking;
  const { data: { favoriteAddresses } } = passenger;
  const tempMessage = message;
  const isPickup = meta.type === 'pickupAddress';

  const favoriteAddress = favoriteAddresses.find(item => item.name === address.label);
  const type = meta.type.replace('Address', '');

  if (favoriteAddress) {
    tempMessage[`${type}Message`] = getFavouriteAddressMessage(favoriteAddress, type);
  }

  const isCompanyDefaultAddress = address && defaultPickupAddress && address.id === defaultPickupAddress.id;
  const isNotFavoriteAddress = !favoriteAddress || !favoriteAddress[`${type}Message`];

  if (isPickup && isCompanyDefaultAddress && isNotFavoriteAddress) {
    tempMessage.pickupMessage = `${messagePrefixes.pickup} ${defaultDriverMessage}`;
  }

  return tempMessage;
};

export const setDefaultMessageToDriver = (address = {}, meta = {}) => (dispatch, getState) => {
  const { booking, passenger } = getState();
  const {
    bookingForm: { message: messageToDriver },
    messageModified
  } = booking;

  let message = separateMessage(messageToDriver);

  if (meta.type !== 'stops' && !messageModified) {
    message = getMessageForAddress({ message, address, meta, booking, passenger });

    dispatch(changeMessageToDriver(formatMessage(message)));
  }
};

export const changeAddress = (address, meta) => (dispatch) => {
  dispatch(setDefaultMessageToDriver(address, meta));

  dispatch({ type: TYPES.changeAddress, payload: { address, meta } });
};

export const changeReference = reference => ({ type: TYPES.changeReference, payload: reference });

export const requestValidateReferences = () => (_, getState) =>
  post('bookings/validate_references', { bookerReferences: getState().booking.bookingForm.bookerReferences });

export const setReferenceErrors = errors => ({ type: TYPES.setReferenceErrors, payload: errors });

export const validateReferences = () => async (dispatch, getState) => {
  const { booking: { bookingForm: { bookerReferences }, formData } } = getState();
  let errors = referencesLocalErrors(bookerReferences);

  if (isEmpty(errors) && formData.bookingReferences.length > 0) {
    try {
      await dispatch(requestValidateReferences());
    } catch ({ response }) {
      errors = response.data.errors;
    }
  }

  dispatch(setReferenceErrors(errors));
  return errors;
};

export const resetBookingValues = () => (dispatch, getState) => {
  const { memberId } = getState().session.user;
  const { pickupAddress } = getState().booking.bookingForm;

  dispatch(changeMessageModified());

  dispatch(changeMessageToDriver(''));

  dispatch(setDefaultMessageToDriver(pickupAddress, { type: 'pickupAddress' }));

  dispatch({ type: TYPES.resetBookingValues, payload: { memberId } });
};

export const changeFlight = (data, touched = false) =>
  ({ type: TYPES.changeFlight, payload: { data, touched } });

export const saveFlight = () => (dispatch, getState) => {
  const { flight } = getState().booking.tempFlight;
  return dispatch(asyncChangeFields({ flight }));
};

const getPaymentAttrs = (formData, passengerId) => {
  const { passengers, passenger: loggedInUser, defaultPaymentType, paymentTypes } = formData;
  const passenger = loggedInUser && loggedInUser.id === passengerId
    ? loggedInUser
    : passengers.find(p => p.id === passengerId);
  const availablePayments = paymentTypes.filter(type => type !== 'passenger_payment_card_periodic');

  let paymentType = '';

  if (!availablePayments.length) {
    const paymentCard = passenger.paymentCards.find(card => card.default) || passenger.paymentCards[0];
    if (paymentCard) paymentType = `${paymentCard.type}_payment_card:${paymentCard.id}`;
  } else {
    paymentType = preparePaymentType({
      payment: availablePayments.find(payments => payments === defaultPaymentType),
      cards: passenger.paymentCards || []
    });
  }

  return paymentTypeToAttrs(paymentType);
};

export const savePassenger = passengerId => (dispatch, getState) => {
  const { formData } = getState().booking;

  const passenger = formData.passengers.find(p => p.id === passengerId);
  const { id, firstName, lastName, phone } = passenger;

  const paymentAttrs = getPaymentAttrs(formData, passengerId);

  dispatch(changeFields({
    ...paymentAttrs,
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

const updateCurrentOrder = data => ({ type: TYPES.updateCurrentOrder, payload: data });

const setBookingUpdater = id => (dispatch) => {
  if (bookingInterval) clearInterval(bookingInterval);
  bookingInterval = setInterval(() => {
    get(`/bookings/${id}`)
      .then(({ data }) => {
        if (FINAL_STATUSES.includes(data.status)) {
          clearInterval(bookingInterval);
          return;
        }
        dispatch(updateCurrentOrder(data));
      });
  }, 3000);
};

export const getFormData = (forceNew = false) => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();

  dispatch({ type: TYPES.getFormDataStart });

  const request = !forceNew && currentOrder.id
    ? get(`/bookings/${currentOrder.id}/edit`)
    : get('/bookings/new');
  return request
    .then(({ data }) => {
      const { session: { user: { memberId } } } = getState();

      const paymentAttrs = getPaymentAttrs(data, memberId);

      dispatch(changeFields({ ...paymentAttrs, defaultPaymentType: paymentAttrs }));

      dispatch({ type: TYPES.getFormDataSuccess, payload: data });

      dispatch({ type: TYPES.updateReferences, payload: data.bookingReferences });

      if (data.booking) {
        const props = {};
        if (data.booking.stops && data.booking.stops.length > 0) {
          props.stops = data.booking.stops.map(stop => stop.address);
        }
        dispatch(changeFields({ ...data.booking, ...props }));
      }

      return data;
    });
};

export const orderStatusSubscribe = channel => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();
  const isFutureOrder = !currentOrder.asap && currentOrder.scheduledAt;

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

        if (isFutureOrder) {
          dispatch(getCurrentUser());
        }

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

export const createBooking = order => (dispatch, getState) => {
  const { booking: { bookingForm, currentOrder } } = getState();
  const isFutureOrder = bookingForm.scheduledType === 'later';

  dispatch({ type: TYPES.createBookingStart });

  return post('/bookings', order)
    .then(({ data }) => {
      if (!currentOrder.id) {
        dispatch(updateCurrentOrder(data));

        if (isFutureOrder) {
          dispatch(getCurrentUser());
          dispatch(getFormData());
        }

        dispatch(goToActiveOrderScene());
        dispatch(orderStatusSubscribe(data.channel));
      } else {
        dispatch({ type: TYPES.setFutureOrderId, payload: data.id });
      }

      return data;
    })
    .catch((errors) => {
      dispatch({ type: TYPES.createBookingFailure, payload: errors });
      return Promise.reject(errors);
    });
};

export const updateBooking = () => (dispatch, getState) => {
  const { booking: { bookingForm, currentOrder } } = getState();

  const order = {
    ...omit(bookingForm, 'status'),
    stops: getStopPoints(bookingForm)
  };

  dispatch(updateCurrentOrder(order));
  return put(`/bookings/${bookingForm.id || currentOrder.id}`, order)
    .then(({ data }) => { dispatch(updateCurrentOrder(data)); });
};

export const setActiveBooking = id => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();

  if (currentOrder.id === id) return Promise.resolve();

  return get(`/bookings/${id}`)
    .then(({ data }) => {
      const isOrderReceived = data.indicatedStatus === ORDER_RECEIVED_STATUS;
      const isFutureOrderEdit = !data.asap && isOrderReceived;
      dispatch(updateCurrentOrder(data));

      if (isFutureOrderEdit) {
        dispatch(getFormData());
      }

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
  dispatch(removeFields(bookingFieldsToReset));
  dispatch(resetBookingValues());

  removeOrderStatusSubscription();
  dispatch(goToOrderCreatingScene());
  dispatch({ type: TYPES.clearCurrentOrder });
  clearInterval(bookingInterval);
};

export const cancelOrder = () => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();
  const isFutureOrder = !currentOrder.asap && currentOrder.scheduledAt;

  dispatch({ type: TYPES.cancelOrderStart });

  return put(`/bookings/${currentOrder.id}/cancel`, { cancellation_fee: false })
    .then(() => {
      dispatch({ type: TYPES.cancelOrderSuccess });
      dispatch(goToCompletedOrderScene());

      if (isFutureOrder) {
        dispatch(getCurrentUser());
      }

      removeOrderStatusSubscription();
    });
};

export const sendCancelOrderReason = reason => (dispatch, getState) => {
  const { booking: { currentOrder } } = getState();

  return put(`/bookings/${currentOrder.id}/cancellation_reason`, { cancellation_reason: reason });
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

  return ratingReasons;
};

export const rateDriver = () => (dispatch, getState) => {
  const { id, tempDriverRating, tempDriverRatingReasons } = getState().booking.currentOrder;
  return put(`/bookings/${id}/rate`, {
    rating: tempDriverRating,
    rating_reasons: (tempDriverRatingReasons && tempDriverRatingReasons) || []
  })
    .then(() => dispatch({ type: TYPES.changeDriverRatingSuccess }));
};

export const saveAvailableCarsScroll = value => ({ type: TYPES.saveAvailableCarsScroll, payload: value });

export const changeSuggestedAddresses = payload => ({ type: TYPES.changeSuggestedAddresses, payload });

export const getSuggestedAddresses = criterion => (dispatch, getState) => {
  const { lat, lng } = getState().booking.suggestedAddresses.coords;

  dispatch({ type: TYPES.startLoadingSuggestedAddresses, payload: criterion });

  return get('/addresses/quick_search', { criterion: snakeCase(criterion), lat, lng })
    .then(({ data }) => {
      dispatch(changeSuggestedAddresses({ [criterion]: { ...data, loaded: true } }));
      return data;
    }).catch((err) => {
      dispatch({ type: TYPES.loadingSuggestedAddressesError, payload: err });
    });
};

export const resetSuggestedAddresses = coords => ({ type: TYPES.resetSuggestedAddresses, payload: coords });

export const clearBooking = () => ({ type: TYPES.clearBooking });
