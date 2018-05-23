import validate from 'validate.js';
import moment from 'moment';

validate.validators.expired = ({ year, month }) => (
  year && month && !moment({ year, month }).isSameOrAfter(moment())
    ? 'is expired'
    : null
);

export default validate;
