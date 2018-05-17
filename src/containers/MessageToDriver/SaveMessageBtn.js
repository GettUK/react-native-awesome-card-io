import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveMessageToDriver } from 'actions/booking';
import { SaveBtn } from 'components';
import { throttledAction } from 'utils';

const SaveMessageBtn = ({ touched, navigation, saveMessageToDriver }) => {
  const handleSave = throttledAction(() => {
    if (touched) {
      saveMessageToDriver();
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

const mapState = ({ ui }) => ({
  touched: ui.map.messageToDriverTouched
});

export default connect(mapState, { saveMessageToDriver })(SaveMessageBtn);
