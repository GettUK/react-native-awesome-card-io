import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  View,
  Text
} from 'react-native';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import { Icon, Input } from 'components';
import {
  changePassword,
  changeEmail,
  login as onSubmitLogin
} from 'actions/ui/login';
// import {
//     logout as onSubmitLogout
// } from 'actions/ui/logout';
import { strings } from 'locales';
import assets from 'assets';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class Login extends Component {
  componentDidMount() {}
  render() {
    const { login: { fields } } = this.props;
    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.image} source={assets.loginBg} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <Icon name="logo" width={250} height={60} fill="#fff" />
          <Input
            value={fields.email}
            onChangeText={this.props.changeEmail}
            style={styles.input}
            autoCorrect={false}
            // autoFocus
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.email')}
            keyboardType="email-address"
            error=""
          />
          <Input
            value={fields.password}
            onChangeText={this.props.changePassword}
            style={styles.input}
            autoCorrect={false}
            controlled
            // autoFocus
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label={strings('login.password')}
            keyboardType="email-address"
            error=""
          />
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.2)"
            style={styles.btn}
            onPress={this.props.onSubmitLogin}>
            <Text style={styles.btnText}>{strings('login.login_button')}</Text>
          </TouchableHighlight>
          <View style={styles.label_unner}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.text_label_forgot}>
                {strings('login.forgot_password')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={this.props.onSubmitLogout}>*/}
          {/* <Text style={styles.text_label_forgot}>*/}
          {/* {strings('login.logout_button')}*/}
          {/* </Text>*/}
          {/* </TouchableOpacity>*/}
        </KeyboardAvoidingView>
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
  // onSubmitLogout
};

export default connect(select, bindActions)(Login);
