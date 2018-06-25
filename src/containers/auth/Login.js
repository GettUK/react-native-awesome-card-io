import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  View,
  Text,
  Dimensions,
  Platform
} from 'react-native';
import validate from 'validate.js';

import {
  Background,
  Icon,
  Input,
  Alert,
  SwitchItem,
  KeyboardHide,
  DismissKeyboardView,
  TransitionView
} from 'components';

import update from 'update-js/fp';

import { login } from 'actions/session';

import { strings } from 'locales';

import { throttledAction, isIphoneX } from 'utils';

import { loginRules } from './validatorRules';
import TextButton from './TextButton';

import styles from './style';
import { prepareSwitchesBlock } from './utils';

class Login extends Component {
  state = {
    isResetSuccess: false,
    loading: false,
    error: '',
    form: {
      email: 'artem@fakemail.com',
      password: 'qwqwqwQ@',
      acceptTac: false,
      acceptPp: false
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

  handleSubmit = () => {
    if (this.validateInputs()) {
      this.setState({ loading: true });
      this.props.login(this.state.form)
        .then(() => this.setState({ loading: false }))
        .then(() => this.props.navigation.navigate('MapView'))
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

  goToCreateAccount = () => {
    this.props.navigation.navigate('Registration', {});
  };

  goToForgot = () => {
    this.props.navigation.navigate('ForgotPassword', { onReturn: this.handleActivation });
    this.resetError();
  };

  goToInfoPage = throttledAction((page) => {
    this.props.navigation.navigate('InfoPages', { page });
  });

  renderSwitchItem = (props, index) => <SwitchItem key={index} {...props} />;

  getCenteredLogoPosition = () => {
    const { height } = Dimensions.get('window');
    const statusBarHeight = isIphoneX() ? 40 : StatusBar.currentHeight || 22;
    const BLOCK_HEIGHT = 478; // Height of logo + inputs block
    const LOGO_HEIGHT = 130; // logo: 70 + 30 marginVertical

    const topPosition = ((height - BLOCK_HEIGHT) + statusBarHeight) / 2;
    const centerY = (height / 2) - (LOGO_HEIGHT / 2);

    const statusBarPadding = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (centerY - topPosition) + statusBarPadding;
  }

  renderFooter = AnimatedWrapper => (
    <AnimatedWrapper>
      <View style={styles.footer}>

        <TouchableHighlight onPress={this.goToCreateAccount}>
          <Text style={[styles.footerText, styles.footerLink]}>
            {strings('login.createAccount')}
          </Text>
        </TouchableHighlight>
      </View>
    </AnimatedWrapper>
  )

  render() {
    const { isResetSuccess, error, form, loading } = this.state;
    const { params } = this.props.navigation.state;
    const switches = prepareSwitchesBlock(
      form,
      { handleChangeField: this.handleInputChange, goToInfoPage: this.goToInfoPage }
    );

    const AnimatedWrapper = params && params.disableAnimation ? View : TransitionView;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Background>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}>
            <AnimatedWrapper scale value={this.getCenteredLogoPosition()}>
              <KeyboardHide>
                <Icon name="logo" style={styles.logo} width={240} height={70} />
              </KeyboardHide>
            </AnimatedWrapper>
            <AnimatedWrapper>
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
              <TouchableOpacity style={styles.btnForgot} onPress={this.goToForgot}>
                <Text style={[styles.forgotText, styles.footerLink]}>
                  {strings('login.forgotPassword')}
                </Text>
              </TouchableOpacity>
              <KeyboardHide>
                {switches.map(this.renderSwitchItem)}
              </KeyboardHide>
              <TextButton
                title={strings('login.loginButton')}
                disabled={!form.acceptTac || !form.acceptPp}
                loading={loading}
                onPress={this.handleSubmit}
                disabledContainerStyle={styles.disabledBtnContainer}
              />

            </AnimatedWrapper>
          </KeyboardAvoidingView>

          {this.renderFooter(AnimatedWrapper)}
        </Background>

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
