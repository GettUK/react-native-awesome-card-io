import { composeReducer } from 'redux-compose-reducer';
import { Dimensions } from 'react-native';
import {
  get,
  map,
  uniqWith,
  isNull,
  concat,
  isEqual
} from 'lodash/fp';
import { nullAddress } from 'utils';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATTITIDE_DELTA = 0.0125;
const LONGTITUDE_DELTA = LATTITIDE_DELTA * ASPECT_RATIO;

const defaultAddress = {
  value: nullAddress(''),
  type: {},
  isTyping: false,
  typingTimeout: 700
};

const initialState = {
  fields: {},
  address: defaultAddress,
  user: {},
  addressModal: false,
  errors: null,
  options: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000
  },
  regionPosition: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATTITIDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  },
  currentPosition: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATTITIDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  }
};

const setTypeNameModel = (field, type, object) => {
  if (!Array.isArray(type.value)) {
    return { ...object };
  }
  if (Array.isArray(type.value) && isNull(type.object)) {
    return uniqWith(isEqual, concat({ ...object }, field || []));
  }
  return map(
    item => (!isEqual(item, object) ? { ...object } : { ...item }),
    field || []
  );
};
const addAddressPoint = state => ({
  ...state,
  fields: {
    ...state.fields,
    [state.address.type.name]: setTypeNameModel(
      get(state.address.type.name, state.fields),
      state.address.type,
      Array.isArray(state.address.type.value) ?
        { address: state.address.value, ...state.user } :
        state.address.value)
  },
  address: defaultAddress
});

const changeAddressType = (state, { payload }) => ({
  ...state,
  address: {
    ...state.address,
    type: { ...payload }
  }
});

const changeAddressTyping = (state, { payload }) => ({
  ...state,
  address: {
    ...state.address,
    isTyping: payload
  }
});

const changeAddress = (state, { payload }) => ({
  ...state,
  address: {
    ...state.address,
    value: payload
  }
});

const addressVisibleModal = (state, { payload }) => ({
  ...state,
  addressModal: payload
});

const initialRegionPosition = (state, { payload }) => ({
  ...state,
  regionPosition: {
    latitude: parseFloat(payload.coords.latitude),
    longitude: parseFloat(payload.coords.longitude),
    latitudeDelta: LATTITIDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  },
  errors: null
});

const changeRegionPosition = (state, { payload }) => ({
  ...state,
  regionPosition: {
    ...payload
  },
  errors: null
});

const changePosition = (state, { payload }) => ({
  ...state,
  currentPosition: {
    latitude: parseFloat(payload.coords.latitude),
    longitude: parseFloat(payload.coords.longitude),
    latitudeDelta: LATTITIDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  },
  errors: null
});

const errorPosition = (state, { payload }) => ({
  ...state,
  errors: payload
});

export default composeReducer(
  'ui/map',
  {
    addAddressPoint,
    changeAddressType,
    changeAddressTyping,
    changeAddress,
    addressVisibleModal,
    initialRegionPosition,
    changeRegionPosition,
    changePosition,
    errorPosition
  },
  initialState
);
