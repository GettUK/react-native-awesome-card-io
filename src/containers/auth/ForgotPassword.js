import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import validate from 'validate.js';

import { Icon, Input, DropdownAlert } from 'components';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';

import { put } from 'utils';

import assets from 'assets';

import { resetPasswordRules } from './validatorRules';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

export default class ForgotPassword extends PureComponent {
  state = {
    email: '',
    error: ''
  };

  handleEmailChange = value => {
    this.setState({ email: value, error: '' });
    this.dropdown.close();
  };

  handleSubmit = () => {
    if (this.validateEmail()) {
      put('/user/forgot_password', { email: this.state.email })
        .then(this.handleSuccessReset);
    }
  };

  handleSuccessReset = () => {
    this.goToLogIn();
    this.props.navigation.state.params.onReturn({ isResetSuccess: true });
  }

  validateEmail() {
    const err = validate({ email: this.state.email }, resetPasswordRules);

    if (err) {
      this.showError(`Error! ${err.email[0]}`);
      this.setState({ error: err.email[0] });
    } else {
      this.resetError();
    }

    return !err;
  }

  showError = error => {
    this.dropdown.showErrorMessage(error);
  };

  resetError = () => {
    this.setState({ error: '' });
  };

  goToLogIn = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { email, error } = this.state;
    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Image style={styles.image} source={assets.loginBg} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <Icon name="logo" style={styles.logo} width={240} height={70} />
          <Input
            value={email}
            onChangeText={this.handleEmailChange}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label="Email"
            keyboardType="email-address"
            error={error}
          />

          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.2)"
            style={styles.btn}
            onPress={this.handleSubmit}>
            <Text style={styles.btnText}>Reset Password</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>

        <TouchableHighlight onPress={this.goToLogIn} style={styles.footer}>
          <Text style={[styles.footerText, styles.footerLink]}>Log in</Text>
        </TouchableHighlight>

        <DropdownAlert
          type='error'
          ref={el => (this.dropdown = el)}
        />
      </DismissKeyboardView>
    );
  }
}
