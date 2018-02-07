import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
import validate from 'validate.js';
import DropdownAlert from 'react-native-dropdownalert';
import {Icon, Input} from 'components';
import axios from 'axios';
import assets from 'assets';
import styles from './style';

export default class ResetPassword extends PureComponent {
  state = {
    email: '',
    error: ''
  };

  handleEmailChange = value => {
    this.setState({ email: value });
  };

  handleSubmit = () => {
    if (this.validateEmail()) {
      axios
        .put('https://dev.gettaxi.me/api/user/forgot_password', {
          email: this.state.email
        })
        .then(this.goToLogIn);
    }
  };

  validateEmail() {
    const err = validate.single(this.state.email, {
      email: { message: 'Invaild email' }
    });
    if (err) {
      this.showError(`Error! ${err[0]}`);
      this.setState({ error: err[0] });
    } else {
      this.resetError();
    }
    return !err;
  }

  showError = error => {
    this.dropdown.alertWithType('error', error, '');
  };

  resetError = () => {
    this.setState({ error: '' });
  };

  goToLogIn = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const { email, error } = this.state;
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.image} source={assets.loginBg} />
        <View style={styles.container}>
          <Icon name="logo" width={250} height={60} fill="#fff" />
          <Input
            value={email}
            onChangeText={this.handleEmailChange}
            style={styles.input}
            autoCorrect={false}
            // autoFocus
            inputStyle={styles.inputStyle}
            labelStyle={styles.label}
            label="Email"
            keyboardType="email-address"
            error={error}
          />
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.2)"
            style={styles.btn}
            onPress={this.handleSubmit}>
            <Text style={styles.btnText}>Reset Password</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={this.goToLogIn} style={styles.footer}>
          <Text style={styles.footerText}>Log in</Text>
        </TouchableHighlight>
        <DropdownAlert
          closeInterval={10000}
          endDelta={30}
          imageStyle={styles.errorImage}
          errorColor="#f00"
          defaultContainer={styles.errorContainer}
          updateStatusBar={false}
          ref={el => (this.dropdown = el)}
          onClose={this.resetError}
        />
      </View>
    );
  }
}
