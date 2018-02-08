import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Image, TouchableHighlight, Text } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import loginBg from 'assets/images/login-bg.jpg';
import { Icon } from 'components';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';

import {
  changePassword,
  changeEmail,
  login as onSubmitLogin
} from 'actions/ui/login';

import { Input } from '../components';
import styles from '../styles';

const DismissKeyboardView = DismissKeyboardHOC(View);

const mapState = (state) => ({
  login: state.ui.login
});

const bindActions = {
  changeEmail,
  changePassword,
  onSubmitLogin
  // onSubmitLogout
};

class Login extends PureComponent {

  static propTypes = {
    login: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired,
    onSubmitLogin: PropTypes.func.isRequired
  };

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
        <Image style={styles.image} source={loginBg}/>
        <View style={styles.container}>
          <Icon name="logo" style={styles.logo} width={240} height={70} />
          <Input
            value={fields.email}
            onChangeText={this.props.changeEmail}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label="Email"
            keyboardType="email-address"
          />
          <Input
            value={fields.password}
            onChangeText={this.props.changePassword}
            style={styles.input}
            autoCorrect={false}
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label="Password"
            secureTextEntry
          />
          <TouchableHighlight underlayColor="rgba(255, 255, 255, 0.2)" style={styles.btn} onPress={this.handleSubmit}>
            <Text style={styles.btnText}>Log in</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, styles.footerTextGap]}>Forget password?</Text>
          <TouchableHighlight onPress={this.goToForgot}>
            <Text style={[styles.footerText, styles.footerLink]}>Reset</Text>
          </TouchableHighlight>
        </View>
        <DropdownAlert
          closeInterval={10000}
          endDelta={30}
          imageStyle={styles.errorImage}
          errorColor="#f00"
          defaultContainer={styles.errorContainer}
          updateStatusBar={false}
          ref={el => this.dropdown = el}
        />
      </DismissKeyboardView>
    );
  }
}

export default connect(mapState, bindActions)(Login);
