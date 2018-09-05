import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  autoThemeMode: true,
  isNightMode: false
};

const changeTheme = (state, { payload: { values } }) => update.assign(state, values);

export default composeReducer('app/theme', {
  changeTheme
}, initialState);
