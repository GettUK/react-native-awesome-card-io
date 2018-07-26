import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { color } from 'theme';

import { savePassenger } from 'actions/booking';
import { SaveBtn } from 'components';

import { strings } from 'locales';

import { throttledAction } from 'utils';

const SavePassengerBtn = ({ touched, navigation, savePassenger }) => {
  const handleSave = throttledAction(() => {
    if (touched) {
      savePassenger();
      navigation.goBack(null);
    }
  });

  return (
    <SaveBtn
      title={strings('header.button.done')}
      onPress={handleSave}
      enabled={touched}
      enabledColor={color.white}
      style={{ paddingRight: 0 }}
    />
  );
};

SavePassengerBtn.propTypes = {
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  savePassenger: PropTypes.func
};

const mapState = ({ booking }) => ({
  touched: booking.passengerIdTouched
});

export default connect(mapState, { savePassenger })(SavePassengerBtn);
