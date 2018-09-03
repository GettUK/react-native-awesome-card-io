import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initialState = {
  current: {},
  forecast: {
    busy: true,
    list: []
  }
};

const getCurrentWeather = (state, { payload }) => (
  update(state, 'current', payload)
);

const getForecastStart = state => (
  update(state, 'forecast.busy', true)
);

const getForecastSuccess = (state, { payload }) => (
  update(state, 'forecast', { ...payload, busy: false })
);

export default composeReducer(
  'ui/weather',
  {
    getCurrentWeather,
    getForecastStart,
    getForecastSuccess
  },
  initialState
);
