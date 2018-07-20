import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveMessageToDriver } from 'actions/booking';
import { SaveBtn } from 'components';

import { strings } from 'locales';

import { throttledAction } from 'utils';

const SaveMessageBtn = ({ touched, navigation, saveMessageToDriver }) => {
  const handleSave = throttledAction(() => {
    if (touched) {
      saveMessageToDriver();
      navigation.goBack(null);
    }
  });

  return (
    <SaveBtn
      title={strings('header.button.done')}
      onPress={handleSave}
      enabled={touched}
      enabledColor="#fff"
      style={{ paddingRight: 0 }}
    />
  );
};

SaveMessageBtn.propTypes = {
  data: PropTypes.object,
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  saveMessageToDriver: PropTypes.func
};

const mapState = ({ booking }) => ({
  touched: booking.messageToDriverTouched
});

export default connect(mapState, { saveMessageToDriver })(SaveMessageBtn);
