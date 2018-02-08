import React, { PureComponent } from 'react';
import { View, StatusBar, Image, TouchableHighlight, Text } from 'react-native';
import axios from 'axios';
import validate from 'validate.js';
import DropdownAlert from 'react-native-dropdownalert';
import loginBg from 'assets/images/login-bg.jpg';
import { Icon } from 'components';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';

import { Input } from '../components';
import styles from '../styles';

const DismissKeyboardView = DismissKeyboardHOC(View);

export default class ForgotPassword extends PureComponent {
  state = {
    email: '',
    error: ''
  };

  handleEmailChange = (value) => {
    this.setState({ email: value });
  };

  handleSubmit = () => {
    if (this.validateEmail()) {
      axios.put('https://dev.gettaxi.me/api/user/forgot_password', { email: this.state.email })
        .then(this.goToLogIn);
    }
  };

  validateEmail() {
    const err = validate.single(this.state.email, { email: { message: 'Invaild email' } });
    if (err) {
      this.showError(`Error! ${err[0]}`);
      this.setState({ error: err[0] });
    } else {
      this.resetError();
    }
    return !err;
  }

  showError = (error) => {
    this.dropdown.alertWithType('error', error, '');
  };

  resetError = () => {
    this.setState({ error: '' });
  };

  goToLogIn = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { email, error } = this.state;
    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.image} source={loginBg}/>
        <View style={styles.container}>
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
          />
          <TouchableHighlight underlayColor="rgba(255, 255, 255, 0.2)" style={styles.btn} onPress={this.handleSubmit}>
            <Text style={styles.btnText}>Reset Password</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={this.goToLogIn} style={styles.footer}>
          <Text style={[styles.footerText, styles.footerLink]}>Log in</Text>
        </TouchableHighlight>
        <DropdownAlert
          closeInterval={10000}
          endDelta={30}
          imageStyle={styles.errorImage}
          errorColor="#f00"
          defaultContainer={styles.errorContainer}
          updateStatusBar={false}
          ref={el => this.dropdown = el}
          onClose={this.resetError}
        />
      </DismissKeyboardView>
    );
  }
}
