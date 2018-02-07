import {
  PASSENGER_VIEW_EMPTY,
  RECEIVE_PASSENGER_VIEW_START,
  RECEIVE_PASSENGER_VIEW_FAILURE,
  RECEIVE_PASSENGER_VIEW_SUCCESS
} from 'actions/ui/passenger-view';

export const initialState = {
  results: null,
  busy: false,
  errors: null
};

export const reducer = (state, action) => {
  switch (action.type) {
  case PASSENGER_VIEW_EMPTY: {
    return {
      ...initialState
    };
  }

  case RECEIVE_PASSENGER_VIEW_START: {
    return {
      ...state,
      busy: true,
      errors: null
    };
  }

  case RECEIVE_PASSENGER_VIEW_FAILURE: {
    return {
      ...state,
      busy: false,
      errors: action.payload
    };
  }

  case RECEIVE_PASSENGER_VIEW_SUCCESS: {
    return {
      ...state,
      results: action.payload,
      busy: false
    };
  }

  default: {
    return state;
  }
  }
};
