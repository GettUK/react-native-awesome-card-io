import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { color } from 'theme';

import { changeFields } from 'actions/booking';
import { SaveBtn } from 'components';

import { strings } from 'locales';

import { throttledAction } from 'utils';

const SavePaymentMethodBtn = ({ touched, navigation, changeFields, paymentMethodData }) => {
  const handleSave = throttledAction(() => {
    if (touched) {
      changeFields({ ...paymentMethodData });
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

SavePaymentMethodBtn.propTypes = {
  touched: PropTypes.bool,
  navigation: PropTypes.object,
  paymentMethodData: PropTypes.object,
  changeFields: PropTypes.func
};

const mapState = ({ booking }) => ({
  touched: booking.paymentMethodTouched,
  paymentMethodData: booking.tempPaymentMethodData || {}
});

export default connect(mapState, { changeFields })(SavePaymentMethodBtn);
