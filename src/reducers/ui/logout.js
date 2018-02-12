import {
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from 'actions/ui/logout';

export const initialState = {
  busy: false,
  errors: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case LOGOUT_START: {
      return {
        ...state,
        busy: true,
        errors: null
      };
    }

    case LOGOUT_SUCCESS: {
      return initialState;
    }

    case LOGOUT_FAILURE: {
      return {
        ...state,
        busy: false,
        errors: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
