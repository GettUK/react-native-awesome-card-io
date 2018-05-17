import React, { PureComponent } from 'react';
import {
  StatusBar,
  Image,
  TouchableHighlight,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import validate from 'validate.js';

import { auth } from 'api';

import { Icon, Input, Alert, DismissKeyboardView } from 'components';

import { strings } from 'locales';

import assets from 'assets';

import TextButton from './TextButton';
import { resetPasswordRules } from './validatorRules';

import styles from './style';

export default class ForgotPassword extends PureComponent {
  state = {
    email: '',
    loading: false,
    error: null
  };

  handleEmailChange = (value) => {
    this.setState({ email: value, error: null });
    this.alert.hide();
  };

  handleSubmit = () => {
    if (this.validateEmail()) {
      this.setState({ loading: true });
      auth.forgotPassword({ email: this.state.email })
        .then(this.handleSuccessReset);
    }
  };

  handleSuccessReset = () => {
    this.setState({ loading: false });
    this.goToLogIn();
    this.props.navigation.state.params.onReturn({ isResetSuccess: true });
  };

  validateEmail() {
    const err = validate({ email: this.state.email }, resetPasswordRules);

    if (err) {
      this.setState({ error: err.email }, this.showError);
    } else {
      this.resetError();
    }

    return !err;
  }

  showError = () => {
    this.alert.show();
  };

  resetError = () => {
    this.setState({ error: null });
  };

  goToLogIn = () => {
    this.alert.hide();
    this.props.navigation.goBack();
  };

  render() {
    const { email, error, loading } = this.state;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Image style={styles.image} source={assets.loginBg} />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
        >
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
            allowedError={false}
            errorStyle={styles.error}
          />

          <TextButton
            title={strings('login.resetButton')}
            loading={loading}
            onPress={this.handleSubmit}
          />
        </KeyboardAvoidingView>

        <TouchableHighlight onPress={this.goToLogIn} style={styles.footer}>
          <Text style={[styles.footerText, styles.footerLink]}>Log in</Text>
        </TouchableHighlight>

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type="failed"
          message={error && error[0]}
          onClose={this.resetError}
        />
      </DismissKeyboardView>
    );
  }
}
