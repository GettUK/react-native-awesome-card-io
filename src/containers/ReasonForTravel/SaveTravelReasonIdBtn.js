import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeFields } from 'actions/booking';
import { SaveBtn } from 'components';

import { strings } from 'locales';

import { throttledAction } from 'utils';

const SaveTravelReasonIdBtn = ({ touched, navigation, changeFields, travelReasonId }) => {
  const handleSave = throttledAction(() => {
    if (touched) {
      changeFields({ travelReasonId });
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

SaveTravelReasonIdBtn.propTypes = {
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  changeFields: PropTypes.func
};

const mapState = ({ booking }) => ({
  touched: booking.travelReasonIdTouched,
  travelReasonId: booking.tempTravelReasonId
});

export default connect(mapState, { changeFields })(SaveTravelReasonIdBtn);
