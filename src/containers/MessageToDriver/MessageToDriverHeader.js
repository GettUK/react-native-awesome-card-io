import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { has } from 'lodash/fp';
import { ScreenHeader } from 'components';
import styles from './styles';

const MessageToDriverHeader = ({ navigation }) => (
  <ScreenHeader
    navigation={navigation}
    title="Message to Driver"
    rightContent={
      <Text style={styles.lengthTitle}>
        {(has('message', navigation.state.params) && navigation.state.params.message.length) || 0} / 250
      </Text>
    }
  />
);

MessageToDriverHeader.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default MessageToDriverHeader;
