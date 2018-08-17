import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

import { changeMessageToDriver } from 'actions/booking';

import { withTheme } from 'providers';

import { isIphoneX } from 'utils';

import styles from './styles';

const MessageToDriver = ({ message, touched, theme, booking, changeMessageToDriver }) => {
  const onChangeText = (message) => {
    changeMessageToDriver(message, true);
  };

  const value = touched ? message : booking.message;

  return (
    <View style={[styles.flex, styles.bg, { backgroundColor: theme.color.bgSecondary }]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={isIphoneX() ? 85 : 65}
        behavior="padding"
        style={styles.flex}
      >
        <TextInput
          style={[styles.input, styles.flex]}
          value={value}
          placeholder="Start type your message"
          onChangeText={onChangeText}
          maxLength={225}
          textAlignVertical="top"
          underlineColorAndroid="transparent"
          multiline
        />
        <Text style={styles.messageLength}>{value.length}/225</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

MessageToDriver.propTypes = {
  navigation: PropTypes.object.isRequired,
  message: PropTypes.string,
  changeMessageToDriver: PropTypes.func.isRequired
};

MessageToDriver.defaultProps = {
  message: ''
};

const mapState = ({ booking }) => ({
  touched: booking.messageToDriverTouched,
  message: booking.tempMessageToDriver,
  booking: booking.currentOrder.id ? booking.currentOrder : booking.bookingForm
});

const mapDispatch = ({
  changeMessageToDriver
});

export default connect(mapState, mapDispatch)(withTheme(MessageToDriver));
