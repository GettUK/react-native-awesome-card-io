import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeMessageToDriver } from 'actions/booking';

import { BackBtn } from 'components';

const BackMessageBtn = ({ navigation, changeMessageToDriver }) => {
  const handleRemoveTempMessage = () => {
    changeMessageToDriver('');
  };

  return (
    <BackBtn
      navigation={navigation}
      touchedPath="booking.messageToDriverTouched"
      color="#fff"
      containerStyle={{ paddingLeft: 0 }}
      backAction={handleRemoveTempMessage}
    />
  );
};

BackMessageBtn.propTypes = {
  navigation: PropTypes.object
};

export default connect(null, { changeMessageToDriver })(BackMessageBtn);
