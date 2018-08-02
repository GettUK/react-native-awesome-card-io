import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendProfileData, setValidationError } from 'actions/passenger';
import { SaveBtn } from 'components';
import { throttledAction, isInputsValid } from 'utils';

import { validationRules } from '../utils';

function SaveProfileBtn({ touched, navigation, data, sendProfileData, setValidationError }) {
  const handleError = error => setValidationError('temp.validationError', error);

  const handleSendData = () => {
    sendProfileData()
      .then(() => navigation.goBack(null));
  };

  const handleSave = throttledAction(() => {
    if (navigation.state.params) {
      const { key, keys } = navigation.state.params;

      if (touched && isInputsValid(keys || [key], data, validationRules, handleError)) {
        handleSendData();
      }
    } else {
      handleSendData();
    }
  });

  return (
    <SaveBtn onPress={handleSave} enabled={touched} />
  );
}

SaveProfileBtn.propTypes = {
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  data: PropTypes.object,
  sendProfileData: PropTypes.func,
  setValidationError: PropTypes.func
};

const mapState = ({ passenger }) => ({
  data: passenger.temp,
  touched: passenger.temp.profileTouched
});

export default connect(mapState, { sendProfileData, setValidationError })(SaveProfileBtn);
