import moment from 'moment-timezone';
import { HourFormat } from 'react-native-hour-format';

export const momentDate = date => moment(date);

export const setDefaultTimezone = timezone => moment.tz.setDefault(timezone);

export const convertToZone = (date, timezone) => moment(date).tz(timezone);

export const minutesForward = minutes => moment().add(minutes, 'minutes');

export const timeFormat = () => (HourFormat.is24HourFormat() ? 'HH:mm' : 'hh:mm a');
