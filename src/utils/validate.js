import validate from 'validate.js';
import moment from 'moment';

validate.validators.expired = ({ year, month }) => (
  year && month && !moment().isBefore(`${year}-${month}-${moment().endOf('month').format('DD')}`)
    ? 'is expired'
    : null
);

export default validate;
