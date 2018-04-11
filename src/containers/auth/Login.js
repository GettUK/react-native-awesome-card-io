import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableHighlight,
  StatusBar,
  Image,
  View,
  Text,
  BackHandler
} from 'react-native';
import validate from 'validate.js';

import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import { Icon, Input, Alert } from 'components';

import {
  changePassword,
  changeEmail,
  login as onSubmitLogin
} from 'actions/ui/login';

import { strings } from 'locales';

import assets from 'assets';

import { loginRules } from './validatorRules';
import TextButton from './TextButton';

import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

const CURRENT_ROUTE = 'Login';

class Login extends Component {
  state = {
    isResetSuccess: false,
    error: ''
  };

  componentWillMount() {
    this.backListener = BackHandler.addEventListener('backPress', () => {
      const { router } = this.props;

      if (router.routes[router.index].routeName !== CURRENT_ROUTE) {
        this.props.navigation.dispatch({ type: 'Navigation/BACK' });

        return true;
      }

      return false;
    });
  }

  componentWillUpdate({ login }, nextState) {
    if (nextState.isResetSuccess && !this.state.isResetSuccess) {
      this.showResetSuccess();
    } else if (login.errors && !this.props.login.errors) {
      const error = login.errors.response && login.errors.response.status === 401
        ? 'The email or password you entered is incorrect'
        : "User can't be logged in now";

      this.setState({ error }, this.showError);
    }
  }

  componentWillUnmount() {
    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  handleSubmit = () => {
    if (this.validateInputs()) {
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

  render() {
    const { login: { fields, busy } } = this.props;
    const { isResetSuccess, error } = this.state;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Image style={styles.image} source={assets.loginBg} />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
          <Icon name="logo" style={styles.logo} width={240} height={70} />
          <Input
            value={fields.email}
            onChangeText={this.props.changeEmail}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.email')}
            keyboardType="email-address"
          />
          <Input
            value={fields.password}
            onChangeText={this.props.changePassword}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.password')}
            secureTextEntry
          />

          <TextButton
            title={strings('login.login_button')}
            loading={busy}
            onPress={this.handleSubmit}
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
  changePassword: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired
  // onSubmitLogout: PropTypes.func.isRequired
};

Login.defaultProps = {};

const select = ({ ui, router }) => ({
  login: ui.login,
  router: router.navigatorLogin
});

const bindActions = {
  changePassword,
  changeEmail,
  onSubmitLogin
};

export default connect(select, bindActions)(Login);
