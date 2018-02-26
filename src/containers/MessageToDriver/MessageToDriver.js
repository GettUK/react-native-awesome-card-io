import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { Button, DismissKeyboardHOC } from 'components';
import { changeTempMessageToDriver, applyMessageToDriver } from 'actions/app/booking';
import styles from './styles';

const DismissKeyboardView = DismissKeyboardHOC(View);

class MessageToDriver extends Component {
  render() {
    const { messageToDriver, changeTempMessageToDriver, applyMessageToDriver } = this.props;
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
              value={messageToDriver}
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

const mapState = (state) => ({
  messageToDriver: state.app.booking.new.temp.messageToDriver || state.app.booking.new.messageToDriver
});

const mapDispatch = ({
  changeTempMessageToDriver,
  applyMessageToDriver
});

export default connect(mapState, mapDispatch)(MessageToDriver);
