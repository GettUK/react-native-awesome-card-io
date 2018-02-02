import { Dimensions } from 'react-native';
import { CHANGE_POSITION, ERROR_POSITION } from 'actions/app/map';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATTITIDE_DELTA = 0.0125;
const LONGTITUDE_DELTA = LATTITIDE_DELTA * ASPECT_RATIO;

export const initialState = {
  errors: null,
  options: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000
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
      currentPosition: initialState.currentPosition,
      errors: action.payload
    };
  }

  default: {
    return state;
  }
  }
};
