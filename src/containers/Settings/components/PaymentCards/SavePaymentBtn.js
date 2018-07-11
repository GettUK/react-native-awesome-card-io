import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPaymentCard, setValidationError } from 'actions/passenger';
import { SaveBtn } from 'components';
import { throttledAction, showMessageAlert, isInputsValid } from 'utils';
import { strings } from 'locales';
import { validationRules } from './utils';

const SavePaymentBtn = ({ touched, navigation, data, addPaymentCard, setValidationError }) => {
  const handleSave = throttledAction(() => {
    const { keys } = navigation.state.params;

    if (touched &&
      isInputsValid(keys, data, validationRules, error => setValidationError('validationPaymentError', error))
    ) {
      addPaymentCard()
        .then(() => navigation.goBack(null))
        .catch(() => {
          setValidationError('validationPaymentError', {});
          showMessageAlert({ message: strings('alert.message.enterValidCreditCard') });
        });
    }
  });

  return <SaveBtn onPress={handleSave} enabled={touched} />;
};

SavePaymentBtn.propTypes = {
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  addPaymentCard: PropTypes.func,
  setValidationError: PropTypes.func
};

const mapState = ({ passenger }) => ({
  data: passenger.newPaymentData,
  touched: passenger.touched
});

export default connect(mapState, { addPaymentCard, setValidationError })(SavePaymentBtn);
