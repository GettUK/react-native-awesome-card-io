import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';

import { sendProfileData, setValidationError } from 'actions/passenger';
import { SaveBtn } from 'components';
import { throttledAction } from 'utils';

import { validationRules } from '../utils';

function SaveProfileBtn({ touched, navigation, data, sendProfileData, setValidationError }) {
  const isInputValid = () => {
    if (navigation.state.params) {
      const { page, keys } = navigation.state.params;

      let results = null;

      (keys || [page]).forEach((key) => {
        if (key in validationRules) {
          const result = validate(data, { [key]: validationRules[key] });

          if (result) results = { ...results, ...result };
        }
      });

      if (results) setValidationError(results);

      return !results;
    }

    return true;
  };

  const handleSave = throttledAction(() => {
    if (touched && isInputValid()) {
      sendProfileData()
        .then(() => navigation.goBack(null));
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
