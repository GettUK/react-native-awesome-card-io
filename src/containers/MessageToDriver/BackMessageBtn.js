import React from 'react';
import PropTypes from 'prop-types';

import { BackBtn } from 'components';

const BackMessageBtn = ({ navigation }) => (
  <BackBtn
    navigation={navigation}
    touchedPath="ui.map.messageToDriverTouched"
    color="#fff"
    containerStyle={{ paddingLeft: 0 }}
  />
);

BackMessageBtn.propTypes = {
  navigation: PropTypes.object
};

export default BackMessageBtn;
