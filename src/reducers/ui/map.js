import { composeReducer } from 'redux-compose-reducer';
import { has, omit, isUndefined } from 'lodash/fp';
import update from 'update-js';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA } from 'utils';

const initialFields = {
  scheduledAt: null,
  scheduledType: 'now',
  travelReasonId: '',
  bookerReferences: [],
  bookerReferencesErrors: {}
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

const changePosition = (state, { payload: { coords } }) => ({
  ...state,
  currentPosition: has('latitude', coords) && has('longitude', coords) ?
    {
      latitude: parseFloat(coords.latitude),
      longitude: parseFloat(coords.longitude),
      latitudeDelta: LATTITIDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    } : state.currentPosition,
  errors: null
});

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

const resetReferenceValues = state =>
  update.with(state, 'fields.bookerReferences', old => old.map(r => omit('value', r)));

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
    resetReferenceValues,
    clearMap
  },
  initialState
);
