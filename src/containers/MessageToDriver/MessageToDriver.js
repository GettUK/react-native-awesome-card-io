import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { Input, Icon, Divider } from 'components';
import { saveMessageToDriver, changeMessageToDriver, updateBooking } from 'actions/booking';
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

const MessageToDriver = ({
  updateBooking, updateEnabled, booking, changeMessageToDriver, saveMessageToDriver, onClose, theme, touched, message
}) => {
  const onChangeText = message => changeMessageToDriver(message, true);

  const value = touched ? message : booking.message;
  const handleMessageSave = throttledAction(() => {
    if (touched) {
      onClose();
      setTimeout(() => {
        saveMessageToDriver('', true);
        changeMessageToDriver('');
        if (updateEnabled) updateBooking();
      }, 350);
    }
  });
  const onPhrasePress = (item) => {
    this.input.focus();
    onChangeText(item);
  };
  const renderPhrase = (item, index) => (
    <TouchableOpacity key={index} onPress={() => onPhrasePress(item)}>
      <Text style={[styles.phrase, { color: theme.color.primaryText }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.flex, styles.bg, { backgroundColor: theme.color.bgSecondary }]}>
      <View style={styles.header}>
        <Input
          inputRef={(el) => { this.input = el; }}
          returnKeyLabel={'Done'}
          returnKeyType={'done'}
          blurOnSubmit
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleMessageSave}
          autoCorrect={false}
          autoFocus
          maxLength={225}
          multiline
          allowedError={false}
          placeholder={strings('app.label.startTypeMessage')}
          placeholderTextColor={theme.color.secondaryText}
          style={styles.input}
          inputStyle={[styles.inputStyle, { color: theme.color.primaryText }]}
          clearIcon={<Icon name="close" size={16} style={styles.clearIcon} color={color.secondaryText} />}
        />
        <Divider left={0} />
      </View>
      <View style={styles.phraseWrapper}>
        {!value && defaultPhrases.map(renderPhrase)}
      </View>
    </View>
  );
};

MessageToDriver.propTypes = {
  changeMessageToDriver: PropTypes.func.isRequired,
  saveMessageToDriver: PropTypes.func.isRequired,
  updateBooking: PropTypes.func.isRequired
};

const mapState = ({ booking }) => ({
  touched: booking.messageToDriverTouched,
  message: booking.tempMessageToDriver
});

const mapDispatch = ({
  saveMessageToDriver,
  changeMessageToDriver,
  updateBooking
});

export default connect(mapState, mapDispatch)(withTheme(MessageToDriver));
