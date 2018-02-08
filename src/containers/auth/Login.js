import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableHighlight,
  StatusBar,
  Platform,
  Image,
  View,
  Text
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import { Icon, Input } from 'components';
import {
  changePassword,
  changeEmail,
  login as onSubmitLogin
} from 'actions/ui/login';
import { strings } from 'locales';
import assets from 'assets';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class Login extends Component {
  handleSubmit = () => {
    this.props.onSubmitLogin();
  };

  goToForgot = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  render() {
    const { login: { fields } } = this.props;
    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.image} source={assets.loginBg} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}
        >
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
            keyboardType="email-address"
            secureTextEntry
          />
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.2)"
            style={styles.btn}
            onPress={this.handleSubmit}
          >
            <Text style={styles.btnText}>{strings('login.login_button')}</Text>
          </TouchableHighlight>
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
        <DropdownAlert
          closeInterval={10000}
          endDelta={30}
          imageStyle={styles.errorImage}
          errorColor="#f00"
          defaultContainer={styles.errorContainer}
          updateStatusBar={false}
          ref={el => (this.dropdown = el)}
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

const select = ({ ui }) => ({
  login: ui.login
});

const bindActions = {
  changePassword,
  changeEmail,
  onSubmitLogin
};

export default connect(select, bindActions)(Login);
