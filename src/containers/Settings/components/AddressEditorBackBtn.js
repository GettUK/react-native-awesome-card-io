import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setValidationError } from 'actions/passenger';
import { BackBtn } from 'components';

const AddressEditorBackBtn = ({ setValidationError, navigation }) => {
  const handleBackPress = () => setValidationError('temp.addressErrors', {});

  return (
    <BackBtn navigation={navigation} backAction={handleBackPress} touchedPath="passenger.temp.addressTouched" />
  );
};

AddressEditorBackBtn.propTypes = {
  navigation: PropTypes.object,
  setValidationError: PropTypes.func
};

export default connect(null, { setValidationError })(AddressEditorBackBtn);
