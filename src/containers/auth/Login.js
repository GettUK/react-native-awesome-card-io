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

import { Icon, Input, Alert, SwitchItem, KeyboardHide, DismissKeyboardView } from 'components';
import update from 'update-js/fp';

import { login } from 'actions/session';

import { strings } from 'locales';

import assets from 'assets';

import { throttledAction } from 'utils';

import { loginRules } from './validatorRules';
import TextButton from './TextButton';

import styles from './style';

class Login extends Component {
  state = {
    isResetSuccess: false,
    loading: false,
    error: '',
    form: {
      email: 'artem@fakemail.com',
      password: 'qwqwqwQ@',
      termsConditions: false,
      privacyPolicy: false
    }
  };

  componentDidUpdate(_, { isResetSuccess }) {
    if (this.state.isResetSuccess && !isResetSuccess) {
      this.showResetSuccess();
    }
  }

  handleInputChange = (input, value) => {
    this.setState(update(`form.${input}`, value));
  };

  handleEmailChange = v => this.handleInputChange('email', v);

  handlePasswordChange = v => this.handleInputChange('password', v);

  handleTermsConditionsChange = v => this.handleInputChange('termsConditions', v);

  handlePrivacyPolicyChange = v => this.handleInputChange('privacyPolicy', v);

  handleSubmit = () => {
    if (this.validateInputs()) {
      this.setState({ loading: true });
      this.props.login(this.state.form)
        .then(() => this.setState({ loading: false }))
        .then(() => this.props.navigation.navigate('App'))
        .catch(this.handleLoginError);
    }
  };

  handleLoginError = (res) => {
    const error = res.response && res.response.status === 401
      ? strings('login.errors.credentialsError')
      : strings('login.errors.commonError');

    this.setState({ loading: false, error }, this.showError);
  };

  handleActivation = (data) => {
    this.setState(data);
  };

  validateInputs() {
    const err = validate(this.state.form, loginRules);

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
    const { isResetSuccess, error, form, loading } = this.state;

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
            value={form.email}
            onChangeText={this.handleEmailChange}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.email')}
            keyboardType="email-address"
          />
          <Input
            value={form.password}
            onChangeText={this.handlePasswordChange}
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
              value={form.termsConditions}
              onValueChange={this.handleTermsConditionsChange}
              onLabelPress={() => this.goToInfoPage('terms')}
            />
            <SwitchItem
              label={strings('login.acceptPrivacyPolicy')}
              value={form.privacyPolicy}
              onValueChange={this.handlePrivacyPolicyChange}
              onLabelPress={() => this.goToInfoPage('privacy')}
            />
          </KeyboardHide>
          <TextButton
            title={strings('login.loginButton')}
            disabled={!form.termsConditions || !form.privacyPolicy}
            loading={loading}
            onPress={this.handleSubmit}
            disabledContainerStyle={styles.disabledBtnContainer}
          />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, styles.footerTextGap]}>
            {strings('login.forgotPassword')}
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
          message={isResetSuccess ? strings('login.successReset') : error}
          onClose={this.onCloseAlert}
        />
      </DismissKeyboardView>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

Login.defaultProps = {};

const mapDispatch = {
  login
};

export default connect(null, mapDispatch)(Login);
