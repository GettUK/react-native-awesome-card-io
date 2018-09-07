import { prepareCoordinates } from 'utils';

export const getStops = order => (
  order.stops || order.stopAddresses
);

export const preparePointsList = (order) => {
  const source = prepareCoordinates(order.pickupAddress);
  const dest = prepareCoordinates(order.destinationAddress);
  const stops = (getStops(order) ? getStops(order).map(s => s.address || s) : []).map(prepareCoordinates);

  return { source, dest, stops };
};
