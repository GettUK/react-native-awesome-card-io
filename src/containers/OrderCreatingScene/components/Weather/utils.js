// useful link https://openweathermap.org/weather-conditions

const iconMapping = {
  '01d': 'sunny',
  '01n': 'night',
  '02d': 'partlyCloudy',
  '02n': 'partlyCloudy',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rainy',
  '09n': 'rainy',
  '10d': 'rainy',
  '10n': 'rainy',
  '11d': 'storm',
  '11n': 'storm',
  '13d': 'snowy',
  '13n': 'snowy',
  '50d': 'windy',
  '50n': 'windy'
};

const getWeatherIcon = code => iconMapping[code];

const convertDegToCompass = (deg) => {
  const val = Math.floor((deg / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[(val % 16)];
};

const gradiens = {
  orange: ['#ffca4e', '#ff8010'],
  blue: ['#5581f1', '#1e5cfa'],
  violet: ['#bb60e0', '#6931fb']
};

const getGradientColors = (weatherIcon) => {
  if (weatherIcon.includes('n')) { // night icons have n in the end
    return gradiens.violet;
  } else if (+weatherIcon.substring(0, 2) > 4) { // bad weather icons have index > 04
    return gradiens.blue;
  }

  return gradiens.orange;
};

const getTemp = temp => (temp ? `${temp.toFixed(0)}°` : '');

export {
  getWeatherIcon,
  convertDegToCompass,
  getGradientColors,
  getTemp
};
