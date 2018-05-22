import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveFlight, changeFlight } from 'actions/booking';

import { SaveBtn } from 'components';
import { throttledAction } from 'utils';

const SaveMessageBtn = ({ touched, navigation, saveFlight, changeFlight }) => {
  const handleSave = throttledAction(() => {
    if (touched) {
      saveFlight();

      changeFlight({ flight: '', flightType: '' }, false);

      navigation.goBack(null);
    }
  });

  return (
    <SaveBtn onPress={handleSave} enabled={touched} enabledColor="#fff" style={{ paddingRight: 0 }} />
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
