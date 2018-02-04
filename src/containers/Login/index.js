import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  View,
  Text
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DismissKeyboardHOC from 'components/HOC/DismissKeyboardHOC';
import TextInputItem from 'components/Common/TextInput';
import {
  changePassword,
  changeEmail,
  login as onSubmitLogin
} from 'actions/ui/login';
// import {
//     logout as onSubmitLogout
// } from 'actions/ui/logout';
import { strings } from 'locales';
import styles from './style';

const DismissKeyboardView = DismissKeyboardHOC(View);

class Login extends Component {
  componentDidMount() {}
  render() {
    const { login: { fields } } = this.props;
    return (
      <DismissKeyboardView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container_bottom}>
          <TextInputItem
            styleContainer={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder={strings('login.email')}
            value={fields.email}
            onChange={this.props.changeEmail}
          />
          <View style={[styles.delimiter]} />
          <TextInputItem
            styleContainer={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20
            }}
            autoCapitalize="none"
            placeholder={strings('login.password')}
            controlled
            value={fields.password}
            onChange={this.props.changePassword}
          />
          <View style={styles.label_unner}>
            <TouchableOpacity
              // onPress={() =>
              //   this.props.navigation.navigate('RecoveryPassword')
              // }
              onPress={() => {}}>
              <Text style={styles.text_label_forgot}>
                {strings('login.forgot_password')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.props.onSubmitLogin}>
            <Text style={styles.text_label_forgot}>
              {strings('login.login_button')}
            </Text>
          </TouchableOpacity>
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
  // navigation: PropTypes.object.isRequired,
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
