import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { color } from 'theme';

import { saveFlight, changeFlight } from 'actions/booking';

import { SaveBtn } from 'components';
import { throttledAction } from 'utils';

import styles from './styles';

const SaveMessageBtn = ({ navigation, saveFlight, changeFlight }) => {
  const { state: { params } } = navigation;
  const verifiedSaved = params && params.verifiedSaved;
  const handleSave = throttledAction(() => {
    if (verifiedSaved) {
      saveFlight();

      changeFlight({ flight: '' }, false);

      navigation.goBack(null);
    }
  });

  return (
    <SaveBtn
      onPress={handleSave}
      enabled={verifiedSaved}
      enabledColor={color.white}
      style={styles.saveButton}
    />
  );
};

SaveMessageBtn.propTypes = {
  data: PropTypes.object,
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  sendAddress: PropTypes.func
};

const mapState = ({ booking }) => ({
  touched: booking.flightTouched
});

export default connect(mapState, { saveFlight, changeFlight })(SaveMessageBtn);
