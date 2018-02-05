import { USER_LOGIN, USER_DATA, USER_LOGOUT } from 'actions/session';

export const initialState = {
  token: null,
  realms: null,
  result: null
};

export const reducer = (state, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return {
      ...state,
      token: action.payload.token,
      realms: action.payload.realms
    };
  }
  case USER_DATA: {
    return {
      ...state,
      result: action.payload
    };
  }
  case USER_LOGOUT: {
    return initialState;
  }

  default: {
    return state;
  }
  }
};
