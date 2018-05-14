import { composeReducer } from 'redux-compose-reducer';
import { omit, isUndefined } from 'lodash/fp';
import update from 'update-js';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA } from 'utils';

const initialFields = {
  scheduledAt: null,
  scheduledType: 'now',
  travelReasonId: '',
  bookerReferences: [],
  bookerReferencesErrors: {},
  pickupAddress: {}
};

const initialState = {
  fields: initialFields,
  user: {},
  errors: null,
  currentPosition: null
};

const removeFields = (state, { payload }) => ({
  ...state,
  fields: omit(payload, state.fields)
});

const changeFields = (state, { payload }) => ({
  ...state,
  fields: {
    ...state.fields,
    ...payload
  }
});

const changeAddress = (state, { payload: { address, meta } }) => {
  if (meta.type !== 'stops') {
    return update(state, `fields.${meta.type}`, address);
  } else if (isUndefined(meta.index)) {
    let processedState = state;
    if (!state.fields.stops) {
      processedState = update(state, 'fields.stops', []);
    }
    return update.push(processedState, 'fields.stops', address);
  }
  return update.with(state, 'fields.stops', old => old.map((s, i) => (i === meta.index ? address : s)));
};

const changePosition = (state, { payload }) => {
  const coords = payload.coords || payload;
  return update(state, {
    currentPosition: coords.latitude && coords.longitude
      ? {
        latitude: parseFloat(coords.latitude),
        longitude: parseFloat(coords.longitude),
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }
      : state.currentPosition,
    errors: null
  });
};

const errorPosition = (state, { payload }) => ({
  ...state,
  errors: payload
});

const changeReference = (state, { payload }) =>
  update(state, {
    [`fields.bookerReferences.{id:${payload.id}}.value`]: payload.value,
    'fields.bookerReferencesErrors': {}
  });

const setReferenceErrors = (state, { payload }) =>
  update(state, 'fields.bookerReferencesErrors', payload);

const resetBookingValues = state =>
  update(state, {
    fields: update.assign({
      ...state.fields.defaultPaymentType,
      bookerReferences: state.fields.bookerReferences.map(r => omit('value', r)),
      scheduledType: 'now',
      scheduledAt: null,
      message: state.fields.defaultDriverMessage
    })
  });

const changeMessageToDriver = (state, { payload }) =>
  update(state, { tempMessageToDriver: payload.message, messageToDriverTouched: payload.touched });

const clearMap = () => initialState;

export default composeReducer(
  'ui/map',
  {
    removeFields,
    changeFields,
    changeAddress,
    changePosition,
    errorPosition,
    changeReference,
    setReferenceErrors,
    resetBookingValues,
    changeMessageToDriver,
    clearMap
  },
  initialState
);
