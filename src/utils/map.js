import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
export const LATTITIDE_DELTA = 0.004;
export const LONGTITUDE_DELTA = LATTITIDE_DELTA * ASPECT_RATIO;
