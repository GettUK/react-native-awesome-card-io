import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SET_SHOW_PASSWORD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from 'actions/ui/login';

export const initialState = {
  fields: {
    email: 'artem@fakemail.com',
    password: 'qwqwqwQ@'
  },
  showPassword: false,
  busy: false,
  errors: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_EMAIL: {
      return {
        ...state,
        fields: {
          ...state.fields,
          email: action.payload
        },
        errors: null
      };
    }

    case CHANGE_PASSWORD: {
      return {
        ...state,
        fields: {
          ...state.fields,
          password: action.payload
        },
        errors: null
      };
    }

    case SET_SHOW_PASSWORD: {
      return {
        ...state,
        showPassword: !state.showPassword,
        errors: null
      };
    }

    case LOGIN_START: {
      return {
        ...state,
        busy: true,
        errors: null
      };
    }

    case LOGIN_SUCCESS: {
      return initialState;
    }

    case LOGIN_FAILURE: {
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
