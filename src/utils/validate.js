import validate from 'validate.js';
import moment from 'moment';
import { strings } from 'locales';

validate.validators.expired = ({ year, month } = {}) => {
  const creditCardDate = moment(`${year}${month}`, 'YYYYMM');
  return creditCardDate.isValid() && (moment() > creditCardDate.add(1, 'months')) ? 'is expired' : null;
};

validate.validators.minLengthWithAllowEmpty = (value, minlength) => {
  if (!value) return null;
  if (value.length < minlength) return strings('fieldValidation.phone.length');
  return null;
};

export default validate;
