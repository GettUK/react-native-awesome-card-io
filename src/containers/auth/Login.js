import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StatusBar,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import validate from 'validate.js';

import {
  Background,
  Icon,
  Input,
  Alert,
  KeyboardHide,
  DismissKeyboardView,
  TransitionView
} from 'components';

import update from 'update-js/fp';

import { login } from 'actions/session';

import { strings } from 'locales';

import { throttledAction, isIphoneX } from 'utils';

import { prepareSwitchesBlock } from './utils';
import { loginRules } from './validatorRules';
import { TextButton, SwitchItem } from './components';

import styles from './style';

const { height } = Dimensions.get('window');

const BLOCK_HEIGHT = 478; // Height of logo + inputs block

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
      this.showError();
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
      ? res.response.data.error
      : strings('alert.message.userCanNotBeLogged');

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
    const LOGO_HEIGHT = 130; // logo: 70 + 30 marginVertical

    const topPosition = ((height - BLOCK_HEIGHT) + statusBarHeight) / 2;
    const centerY = (height / 2) - (LOGO_HEIGHT / 2);

    const statusBarPadding = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (centerY - topPosition) + statusBarPadding;
  };

  renderForm = (Wrapper) => {
    const { form, loading } = this.state;

    const switches = prepareSwitchesBlock(
      form,
      { handleChangeField: this.handleInputChange, goToInfoPage: this.goToInfoPage }
    );

    const smallFormArea = height < (BLOCK_HEIGHT + 130) || !this.props.isConnected;

    return (
      <Wrapper>
        <Input
          value={form.email}
          onChangeText={this.handleEmailChange}
          style={styles.input}
          autoCorrect={false}
          inputStyle={styles.inputStyle}
          labelStyle={styles.label}
          label={strings('auth.label.email')}
          keyboardType="email-address"
        />
        <Input
          value={form.password}
          onChangeText={this.handlePasswordChange}
          style={styles.input}
          autoCorrect={false}
          inputStyle={styles.inputStyle}
          labelStyle={styles.label}
          label={strings('auth.label.password')}
          secureTextEntry
        />
        <View style={styles.btnForgot}>
          <TouchableWithoutFeedback onPress={this.goToForgot}>
            <View><Text style={styles.forgotText}>{strings('auth.text.forgotPassword')}</Text></View>
          </TouchableWithoutFeedback>
        </View>
        <KeyboardHide>
          {switches.map(this.renderSwitchItem)}
        </KeyboardHide>
        <TextButton
          title={strings('auth.label.logIn')}
          disabled={!form.acceptTac || !form.acceptPp}
          loading={loading}
          onPress={this.handleSubmit}
          disabledContainerStyle={styles.disabledBtnContainer}
        />

        {smallFormArea && this.renderFooter(Wrapper)}
      </Wrapper>
    );
  };

  renderFooter = Wrapper => (
    <Wrapper>
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={this.goToCreateAccount}>
          <View>
            <Text style={[styles.footerText, styles.footerLink]}>
              {strings('auth.text.openAccountToday')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Wrapper>
  );

  renderContent = () => {
    const { params } = this.props.navigation.state;

    const AnimatedWrapper = (params && params.disableAnimation) || !this.props.isConnected ? View : TransitionView;
    const smallFormArea = height < (BLOCK_HEIGHT + 130) || !this.props.isConnected;
    const Wrapper = smallFormArea ? ScrollView : View;

    return (
      <Background>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
          <AnimatedWrapper scale value={this.getCenteredLogoPosition()}>
            <KeyboardHide>
              <Icon name="logo" style={styles.logo} width={240} height={70} />
            </KeyboardHide>
          </AnimatedWrapper>
          <Wrapper>
            {this.renderForm(AnimatedWrapper)}
          </Wrapper>
        </KeyboardAvoidingView>

        {!smallFormArea && this.renderFooter(AnimatedWrapper)}
      </Background>
    );
  };

  render() {
    const { isResetSuccess, error } = this.state;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />

        {this.renderContent()}

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type={isResetSuccess ? 'success' : 'failed' }
          message={isResetSuccess ? strings('auth.text.passwordWasReset') : error}
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

const mapState = ({ network }) => ({
  isConnected: network.isConnected
});

const mapDispatch = {
  login
};

export default connect(mapState, mapDispatch)(Login);
