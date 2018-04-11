import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Button, DismissKeyboardHOC } from 'components';
import { changeFields } from 'actions/ui/map';
import styles from './styles';

const DismissKeyboardView = DismissKeyboardHOC(View);

class MessageToDriver extends Component {
  state = {
    message: ''
  };

  componentWillMount() {
    this.onChangeText(this.props.message);
  }

  handleFocusInput = () => {
    this.input.focus();
  };

  onChangeText = (message) => {
    this.setState({ message });
    this.props.navigation.setParams({ message });
  };

  onSubmit = () => {
    const { message } = this.state;
    const { changeFields, navigation } = this.props;
    changeFields({ message });
    navigation.goBack();
  };

  render() {
    const { message } = this.state;
    return (
      <View style={[styles.flex, styles.bg]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={60}
            behavior="padding"
            style={styles.flex}
          >
            <TouchableWithoutFeedback onPress={this.handleFocusInput}>
              <View style={styles.flex}>
                <TextInput
                  ref={(input) => { this.input = input; }}
                  style={ styles.input}
                  value={message}
                  onChangeText={this.onChangeText}
                  maxLength={250}
                  multiline
                />
              </View>
            </TouchableWithoutFeedback>

            <Button
              raised={false}
              styleContent={styles.submitBtn}
              onPress={this.onSubmit}
            >
              <Text style={styles.submitBtnText}>Send Message</Text>
            </Button>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
      </View>
    );
  }
}

MessageToDriver.propTypes = {
  navigation: PropTypes.object.isRequired,
  message: PropTypes.string,
  changeFields: PropTypes.func.isRequired
};

MessageToDriver.defaultProps = {
  message: ''
};

const mapState = ({ ui }) => ({
  message: ui.map.fields.message
});

const mapDispatch = ({
  changeFields
});

export default connect(mapState, mapDispatch)(MessageToDriver);
