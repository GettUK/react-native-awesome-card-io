import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
export const LATTITIDE_DELTA = 0.02;
export const LONGTITUDE_DELTA = LATTITIDE_DELTA * ASPECT_RATIO;

export const getAngleBetweenCoordinates = ({ lat1, long1, lat2, long2 }) => {
  const dLon = (long2 - long1);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon));

  return (Math.atan2(y, x) * 180) / Math.PI;
};
