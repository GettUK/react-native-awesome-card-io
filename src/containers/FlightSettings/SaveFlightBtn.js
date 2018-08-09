import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { color } from 'theme';

import { saveFlight, changeFlight } from 'actions/booking';

import { SaveBtn } from 'components';
import { throttledAction } from 'utils';

import styles from './styles';

const SaveMessageBtn = ({ navigation, saveFlight, changeFlight }) => {
  const handleSave = throttledAction(() => {
    saveFlight();

    changeFlight({ flight: '' }, false);

    navigation.goBack(null);
  });

  if (navigation.state && navigation.state.params && !navigation.state.params.verifiedSaved) {
    return <View style={styles.stubButton} />;
  }

  return (
    <SaveBtn onPress={handleSave} enabled enabledColor={color.white} style={styles.saveButton} />
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
