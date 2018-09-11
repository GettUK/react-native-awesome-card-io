import { get, getSeparatedDate } from 'utils';

const getFlights = (flight) => {
  const { year, month, day } = getSeparatedDate();

  return get('/flightstats/flights', { flight, year, month, day });
};

export default {
  getFlights
};
