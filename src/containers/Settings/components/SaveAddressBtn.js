import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendAddress, setValidationError } from 'actions/passenger';
import { SaveBtn } from 'components';
import { throttledAction, isInputsValid } from 'utils';

import { addressValidationRules } from '../utils';


const SaveAddressBtn = ({ touched, navigation, data, sendAddress, setValidationError }) => {
  const isValid = () => isInputsValid(
    Object.keys(addressValidationRules),
    data,
    addressValidationRules,
    errors => setValidationError('temp.addressErrors', errors)
  );

  const handleSave = throttledAction(() => {
    if (touched && isValid()) {
      sendAddress()
        .then(() => navigation.goBack(null))
        .catch(() => {
          setValidationError('temp.addressErrors', {});
        });
    }
  });

  return (
    <SaveBtn onPress={handleSave} enabled={touched} />
  );
};

SaveAddressBtn.propTypes = {
  data: PropTypes.object,
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  sendAddress: PropTypes.func,
  setValidationError: PropTypes.func
};

const mapState = ({ passenger }) => ({
  data: passenger.temp.address,
  touched: passenger.temp.addressTouched
});

export default connect(mapState, { sendAddress, setValidationError })(SaveAddressBtn);
