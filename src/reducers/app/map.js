import { Dimensions } from 'react-native';
import {
  CHANGE_ADDRESS,
  ADDRESS_VISIBLE_MODAL,
  INITIAL_REGION_POSITION,
  CHANGE_REGION_POSITION,
  CHANGE_POSITION,
  ERROR_POSITION
} from 'actions/app/map';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATTITIDE_DELTA = 0.0125;
const LONGTITUDE_DELTA = LATTITIDE_DELTA * ASPECT_RATIO;

export const initialState = {
  fields: {
    address: ''
  },
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

export const reducer = (state, action) => {
  switch (action.type) {
  case CHANGE_ADDRESS: {
    return {
      ...state,
      fields: {
        ...state.fields,
        address: action.payload
      }
    };
  }
  case ADDRESS_VISIBLE_MODAL: {
    return {
      ...state,
      addressModal: action.payload
    };
  }
  case INITIAL_REGION_POSITION: {
    return {
      ...state,
      regionPosition: {
        latitude: parseFloat(action.payload.coords.latitude),
        longitude: parseFloat(action.payload.coords.longitude),
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      },
      errors: null
    };
  }
  case CHANGE_REGION_POSITION: {
    return {
      ...state,
      regionPosition: {
        ...action.payload
      },
      errors: null
    };
  }
  case CHANGE_POSITION: {
    return {
      ...state,
      currentPosition: {
        latitude: parseFloat(action.payload.coords.latitude),
        longitude: parseFloat(action.payload.coords.longitude),
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      },
      errors: null
    };
  }

  case ERROR_POSITION: {
    return {
      ...state,
      errors: action.payload
    };
  }

  default: {
    return state;
  }
  }
};
