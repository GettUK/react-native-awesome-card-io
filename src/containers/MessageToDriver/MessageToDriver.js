import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { Input, Icon, Divider } from 'components';
import { saveMessageToDriver, changeMessageToDriver } from 'actions/booking';
import { color } from 'theme';
import { withTheme } from 'providers';
import { strings } from 'locales';
import { throttledAction } from 'utils';
import styles from './styles';

const defaultPhrases = [
  strings('messageToDriver.text.callOnArrival'),
  strings('messageToDriver.text.doNotCall'),
  strings('messageToDriver.text.meetAtArrivals'),
  strings('messageToDriver.text.ringDoorOnArrival'),
  strings('messageToDriver.text.parkAndWait'),
  strings('messageToDriver.text.ifLateCallMe')
];

const MessageToDriver = ({ message, touched, booking, changeMessageToDriver, saveMessageToDriver, onClose }) => {
  const onChangeText = (message) => {
    changeMessageToDriver(message, true);
  };

  const value = touched ? message : booking.message;
  const onCloseModal = () => {
    changeMessageToDriver('');
    onClose();
  };
  const handleSave = throttledAction(() => {
    if (touched) {
      saveMessageToDriver('', true);
      onCloseModal();
    }
  });
  const onPhrasePress = (item) => {
    onChangeText(item);
    this.input.focus();
  };
  const renderPhrase = (item, index) => (
    <TouchableOpacity key={index} onPress={() => onPhrasePress(item)}>
      <Text style={styles.phrase}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Fragment>
      <View style={styles.header}>
        <Input
          inputRef={(el) => { this.input = el; }}
          returnKeyLabel={'Done'}
          returnKeyType={'done'}
          blurOnSubmit
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSave}
          autoCorrect={false}
          autoFocus
          maxLength={225}
          multiline
          allowedError={false}
          placeholder={strings('app.label.startTypeMessage')}
          inputStyle={styles.inputStyle}
          clearIcon={<Icon name="close" size={16} style={styles.clearIcon} color={color.secondaryText} />}
        />
        <Divider left={0} />
      </View>
      {!value && defaultPhrases.map(renderPhrase)}
    </Fragment>
  );
};

MessageToDriver.propTypes = {
  message: PropTypes.string,
  changeMessageToDriver: PropTypes.func.isRequired,
  saveMessageToDriver: PropTypes.func.isRequired
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
  saveMessageToDriver,
  changeMessageToDriver
});

export default connect(mapState, mapDispatch)(withTheme(MessageToDriver));
