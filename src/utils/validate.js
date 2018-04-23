import validate from 'validate.js';
import moment from 'moment';

validate.validators.currentYear = value => (
  value && moment({ year: value }) <= moment()
    ? 'is expired'
    : null
);

export default validate;
