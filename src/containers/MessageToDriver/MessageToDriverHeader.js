import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { ScreenHeader } from 'components';
import styles from './styles';

const MessageToDriverHeader = ({ navigation, messageLength }) => (
    <ScreenHeader
      navigation={navigation}
      title="Message to Driver"
      rightContent={<Text style={styles.lengthTitle}>{messageLength} / 250</Text>}
    />
);

const mapState = (state) => {
  const newBooking = state.bookings.new;
  const messageLength = (newBooking.temp.messageToDriver && newBooking.temp.messageToDriver.length)
    || newBooking.messageToDriver.length;
  return ({
    messageLength
  });
};
export default connect(mapState)(MessageToDriverHeader);
