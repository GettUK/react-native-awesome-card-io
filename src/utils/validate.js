import validate from 'validate.js';
import moment from 'moment';

validate.validators.expired = ({ year, month } = {}) => {
  const creditCardDate = moment(`${year}${month}`, 'YYYYMM');
  return creditCardDate.isValid() && (moment() > creditCardDate.add(1, 'months')) ? 'is expired' : null;
};

export default validate;
