import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { Button, DismissKeyboardHOC } from 'components';
import { changeTempMessageToDriver, applyMessageToDriver } from 'actions/booking';
import styles from './styles';

const DismissKeyboardView = DismissKeyboardHOC(View);

class MessageToDriver extends Component {
  componentDidMount() {
    const { messageToDriver, changeTempMessageToDriver } = this.props;
    changeTempMessageToDriver(messageToDriver);
  }

  render() {
    const { tempMessageToDriver, changeTempMessageToDriver, applyMessageToDriver } = this.props;
    return (
      <View style={[styles.flex, styles.bg]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={55}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.flex}
          >
            <TextInput
              style={[styles.flex, styles.input]}
              value={tempMessageToDriver}
              onChangeText={changeTempMessageToDriver}
              maxLength={250}
              multiline
            />
            <Button raised={false} style={styles.submitBtn} onPress={applyMessageToDriver}>
              <Text style={styles.submitBtnText}>Send Message</Text>
            </Button>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
      </View>
    );
  }
}

const mapState = ({ bookings }) => ({
  messageToDriver: bookings.new.messageToDriver,
  tempMessageToDriver: bookings.new.temp.messageToDriver
});

const mapDispatch = ({
  changeTempMessageToDriver,
  applyMessageToDriver
});

export default connect(mapState, mapDispatch)(MessageToDriver);
