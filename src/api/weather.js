import Axios from 'axios';
import config from 'config';

const WeatherApi = Axios.create({
  baseURL: config.weatherUrl,
  responseType: 'json',
  params: {
    APPID: config.weatherAPIKey,
    units: 'metric'
  }
});

const convertLocationFormat = location => ({ lat: location.lat, lon: location.lng });

const getCurrentWeather = location => WeatherApi.get('/weather', { params: convertLocationFormat(location) });

const getForecast = location => WeatherApi.get('/forecast/daily', {
  params: { ...convertLocationFormat(location), cnt: 5 }
});

export default {
  getCurrentWeather,
  getForecast
};
