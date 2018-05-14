import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { changeMessageToDriver } from 'actions/booking';
import styles from './styles';

class MessageToDriver extends Component {
  componentDidMount() {
    const { changeMessageToDriver, navigation } = this.props;
    changeMessageToDriver(navigation.state.params.message);
  }

  onChangeText = (message) => {
    this.props.changeMessageToDriver(message, true);
  };

  render() {
    const { message } = this.props;
    return (
      <View style={[styles.flex, styles.bg]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={65}
          behavior="padding"
          style={styles.flex}
        >
          <TextInput
            style={[styles.input, styles.flex]}
            value={message}
            placeholder="Start type your message"
            onChangeText={this.onChangeText}
            maxLength={250}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            multiline
          />
          <Text style={styles.messageLength}>{message.length}/250</Text>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

MessageToDriver.propTypes = {
  navigation: PropTypes.object.isRequired,
  message: PropTypes.string,
  changeMessageToDriver: PropTypes.func.isRequired
};

MessageToDriver.defaultProps = {
  message: ''
};

const mapState = ({ ui }) => ({
  message: ui.map.tempMessageToDriver
});

const mapDispatch = ({
  changeMessageToDriver
});

export default connect(mapState, mapDispatch)(MessageToDriver);
