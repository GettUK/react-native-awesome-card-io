import { prepareCoordinates } from 'utils';

export const getStops = order => (
  order.stops || order.stopAddresses
);

export const preparePointsList = (order) => {
  const source = prepareCoordinates(order.pickupAddress);
  const dest = prepareCoordinates(order.destinationAddress);
  const stops = (getStops(order) || []).map(prepareCoordinates);

  return { source, dest, stops };
};
