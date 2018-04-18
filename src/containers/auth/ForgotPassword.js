import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import validate from 'validate.js';

import { resetPassword } from 'actions/ui/resetPassword';

import { Icon, Input, Alert } from 'components';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';

import { strings } from 'locales';

import assets from 'assets';

import TextButton from './TextButton';
import { resetPasswordRules } from './validatorRules';

import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class ForgotPassword extends PureComponent {
  state = {
    email: '',
    error: null
  };

  handleEmailChange = (value) => {
    this.setState({ email: value, error: null });
    this.alert.hide();
  };

  handleSubmit = () => {
    if (this.validateEmail()) {
      this.props.resetPassword({ email: this.state.email })
        .then(this.handleSuccessReset);
    }
  };

  handleSuccessReset = () => {
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
    const { busy } = this.props;
    const { email, error } = this.state;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Image style={styles.image} source={assets.loginBg} />

        <KeyboardAvoidingView
          behavior="padding"
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
            errorStyle={styles.error}
          />

          <TextButton
            title={strings('login.reset_button')}
            loading={busy}
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

const select = ({ ui }) => ({
  busy: ui.resetPassword.busy
});

const mapDispatch = {
  resetPassword
};

export default connect(select, mapDispatch)(ForgotPassword);
