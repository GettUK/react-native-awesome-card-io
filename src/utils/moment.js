import moment from 'moment-timezone';

export const momentDate = date => moment(date);

export const setDefaultTimezone = timezone => moment.tz.setDefault(timezone);

export const convertToZone = (date, timezone) => moment(date).tz(timezone);

export const hourForward = () => moment().add(60, 'minutes').toDate();
