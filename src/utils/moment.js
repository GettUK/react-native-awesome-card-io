import moment from 'moment-timezone';
import { HourFormat } from 'react-native-hour-format';

export const momentDate = date => moment(date);

export const setDefaultTimezone = timezone => moment.tz.setDefault(timezone);

export const convertToZone = (date, timezone) => moment(date).tz(timezone);

export const hourForward = () => moment().add(60, 'minutes');

export const formatedTime = time => (HourFormat.is24HourFormat()
  ? moment(time).format('D MMM YYYY, HH:mm')
  : moment(time).format('D MMM YYYY, hh:mm a'));
