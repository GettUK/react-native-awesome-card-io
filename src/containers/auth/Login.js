import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableHighlight,
  StatusBar,
  Image,
  View,
  Text
} from 'react-native';
import validate from 'validate.js';

import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import { Icon, Input, Alert, SwitchItem, KeyboardHide } from 'components';

import {
  termsConditionsSwitch,
  privacyPolicySwitch,
  changePassword,
  changeEmail,
  login as onSubmitLogin
} from 'actions/ui/login';

import { strings } from 'locales';

import assets from 'assets';

import { throttledAction } from 'utils';

import { loginRules } from './validatorRules';
import TextButton from './TextButton';

import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class Login extends Component {
  state = {
    isResetSuccess: false,
    error: ''
  };

  componentDidUpdate({ login: loginProps }, { isResetSuccess }) {
    const { login } = this.props;

    if (this.state.isResetSuccess && !isResetSuccess) {
      this.showResetSuccess();
    } else if (login.errors && !loginProps.errors) {
      this.showLoginErrors(login);
    } else if (!login.busy && loginProps.busy && !login.errors) {
      this.props.navigation.navigate('App');
    }
  }

  showLoginErrors(login) {
    const error = login.errors.response && login.errors.response.status === 401
      ? 'The email or password you entered is incorrect'
      : "User can't be logged in now";

    this.setState({ error }, this.showError);
  }

  handleSubmit = () => {
    const { login: { checkboxes: { termsConditions, privacyPolicy } } } = this.props;

    if (termsConditions && privacyPolicy && this.validateInputs()) {
      this.props.onSubmitLogin();
    }
  };

  handleActivation = (data) => {
    this.setState(data);
  };

  validateInputs() {
    const { login: { fields } } = this.props;

    const err = validate(
      { email: fields.email, password: fields.password },
      loginRules
    );

    if (err) {
      const errorMessage = (err.email && err.email[0]) || (err.password && err.password[0]);

      this.setState({ error: errorMessage }, this.showError);
    } else {
      this.resetError();
    }

    return !err;
  }

  showResetSuccess = () => {
    this.alert.show();
  };

  showError = () => {
    this.alert.show();
  };

  onCloseAlert = () => {
    this.setState({ isResetSuccess: false });
  };

  resetError = () => {
    this.setState({ error: '' });
  };

  goToForgot = () => {
    this.props.navigation.navigate('ForgotPassword', { onReturn: this.handleActivation });
    this.resetError();
  };

  goToInfoPage = throttledAction((page) => {
    this.props.navigation.navigate('InfoPages', { page });
  });

  render() {
    const { login: { fields, busy, checkboxes: { termsConditions, privacyPolicy } } } = this.props;
    const { isResetSuccess, error } = this.state;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Image style={styles.image} source={assets.loginBg} />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
          <KeyboardHide>
            <Icon name="logo" style={styles.logo} width={240} height={70} />
          </KeyboardHide>
          <Input
            value={fields.email || ''}
            onChangeText={this.props.changeEmail}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.email')}
            keyboardType="email-address"
          />
          <Input
            value={fields.password || ''}
            onChangeText={this.props.changePassword}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.password')}
            secureTextEntry
          />
          <KeyboardHide>
            <SwitchItem
              label={strings('login.acceptTermsConditions')}
              value={termsConditions || false}
              onValueChange={this.props.termsConditionsSwitch}
              onLabelPress={() => this.goToInfoPage('terms')}
            />
            <SwitchItem
              label={strings('login.acceptPrivacyPolicy')}
              value={privacyPolicy || false}
              onValueChange={this.props.privacyPolicySwitch}
              onLabelPress={() => this.goToInfoPage('privacy')}
            />
          </KeyboardHide>
          <TextButton
            title={strings('login.login_button')}
            disabled={!termsConditions || !privacyPolicy}
            loading={busy}
            onPress={this.handleSubmit}
            disabledContainerStyle={styles.disabledBtnContainer}
          />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, styles.footerTextGap]}>
            {strings('login.forgot_password')}
          </Text>
          <TouchableHighlight onPress={this.goToForgot}>
            <Text style={[styles.footerText, styles.footerLink]}>
              {strings('login.reset')}
            </Text>
          </TouchableHighlight>
        </View>

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type={isResetSuccess ? 'success' : 'failed' }
          message={isResetSuccess ? strings('login.success_reset') : error}
          onClose={this.onCloseAlert}
        />
      </DismissKeyboardView>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  termsConditionsSwitch: PropTypes.func.isRequired,
  privacyPolicySwitch: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired
};

Login.defaultProps = {};

const select = ({ ui, router }) => ({
  login: ui.login,
  router: router.navigatorLogin
});

const bindActions = {
  termsConditionsSwitch,
  privacyPolicySwitch,
  changePassword,
  changeEmail,
  onSubmitLogin
};

export default connect(select, bindActions)(Login);
