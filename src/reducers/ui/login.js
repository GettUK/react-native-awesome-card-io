import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  fields: {
    email: 'artem@fakemail.com',
    password: 'qwqwqwQ@'
  },
  checkboxes: {},
  busy: false,
  errors: null
};

const changeField = (state, { payload: { path, field, value } }) =>
  update(state, { [(path && `${path}.${field}`) || field]: value, errors: null });

const loginStart = state => update(state, { busy: true, errors: null });

const loginSuccess = () => initialState;

const loginFailure = (state, { payload }) => update(state, { busy: false, errors: payload });

export default composeReducer(
  'ui/login',
  {
    changeField,
    loginStart,
    loginSuccess,
    loginFailure
  },
  initialState
);
