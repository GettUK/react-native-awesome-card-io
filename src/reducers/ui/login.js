import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  fields: {
    email: 'artem@fakemail.com',
    password: 'qwqwqwQ@'
  },
  showPassword: false,
  busy: false,
  errors: null
};

const changeEmail = (state, { payload }) => ({
  ...state,
  fields: {
    ...state.fields,
    email: payload
  },
  errors: null
});

const changePassword = (state, { payload }) => ({
  ...state,
  fields: {
    ...state.fields,
    password: payload
  },
  errors: null
});

const setShowPassword = state => ({
  ...state,
  showPassword: !state.showPassword,
  errors: null
});

const loginStart = state => ({
  ...state,
  busy: true,
  errors: null
});

const loginSuccess = () => initialState;

const loginFailure = (state, { payload }) => ({
  ...state,
  busy: false,
  errors: payload
});

export default composeReducer(
  'ui/login',
  {
    changeEmail,
    changePassword,
    setShowPassword,
    loginStart,
    loginSuccess,
    loginFailure
  },
  initialState
);
