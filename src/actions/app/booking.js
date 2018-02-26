import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('booking', [
  'changeTempMessageToDriver',
  'applyMessageToDriver'
]);

export const changeTempMessageToDriver = (message) => (dispatch) => {
  dispatch({ type: TYPES.changeTempMessageToDriver, message });
};

export const applyMessageToDriver = () => (dispatch) => {
  dispatch({ type: TYPES.applyMessageToDriver });
};
