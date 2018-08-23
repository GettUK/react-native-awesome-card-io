import { createTypes } from 'redux-compose-reducer';
import { weather } from 'api';

const TYPES = createTypes('ui/weather', [
  'getCurrentWeather',
  'getForecastStart',
  'getForecastSuccess'
]);

export const getCurrentWeather = location => dispatch =>
  weather.getCurrentWeather(location)
    .then(res => dispatch({ type: TYPES.getCurrentWeather, payload: res.data }));

export const getForecast = () => (dispatch, getState) => {
  dispatch({ type: TYPES.getForecastStart });

  return weather.getForecast(getState().booking.bookingForm.pickupAddress)
    .then(res => dispatch({ type: TYPES.getForecastSuccess, payload: res.data }));
};

