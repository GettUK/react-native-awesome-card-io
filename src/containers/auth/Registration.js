import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, View, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Answers } from 'react-native-fabric';

import { auth } from 'api';

import {
  Icon,
  Alert,
  Input,
  DismissKeyboardView,
  Divider,
  SuccessPopup,
  Background,
  Header,
  BackBtn
} from 'components';
import update from 'update-js/fp';

import { strings } from 'locales';
import { throttledAction, isInputsValid } from 'utils';
import { color } from 'theme';

import { TextButton, SwitchItem } from './components';

import { prepareSwitchesBlock, prepareInputsBlock } from './utils';
import { registerCompanyRules } from './validatorRules';
import styles from './style';

const defaultCountry = {
  value: 'GB',
  label: 'United Kingdom'
};

const initialForm = {
  userName: '',
  phoneNumber: '',
  email: '',
  name: '',
  comment: '',
  country: defaultCountry.value,
  acceptTac: false,
  acceptPp: false
};

export default class Registration extends Component {
  state = {
    loading: false,
    error: '',
    errors: null,
    currentCountry: defaultCountry,
    form: initialForm
  };


  handleChangeField = (input, value) => {
    this.setState(update(`form.${input}`, value));
  };

  handleChangeCountry = (v) => {
    this.setState(update({
      'form.country': v.value || '',
      currentCountry: v
    }));
  };

  showError = () => {
    this.alert.show();
  };

  setErrors = (errors) => {
    this.setState({ errors });
  };

  handleSubmit = () => {
    const keys = ['userName', 'phoneNumber', 'email', 'name'];
    if (isInputsValid(keys, this.state.form, registerCompanyRules, this.setErrors)) {
      this.setState({ loading: true, errors: null });
      auth.registerCompany(this.state.form)
        .then(this.handleRegisterSuccess)
        .catch(this.handleRegisterError);
    }
  };

  handleRegisterSuccess = () => {
    Answers.logSignUp('Company', true);
    this.setState({ loading: false, form: initialForm });
    this.successPopup.open();
  };

  handleRegisterError = () => {
    const error = strings('alert.message.youCanNotRegisterCompany');
    Answers.logSignUp('Company', false, { error });
    this.setState({ loading: false, error }, this.showError);
  };

  goToSelectCountry = () => {
    this.props.navigation.navigate(
      'CountrySelector',
      { onSelect: this.handleChangeCountry, select: this.state.currentCountry }
    );
  };

  goToInfoPage = throttledAction((page) => {
    Answers.logContentView(`${strings(`information.${page}`)} was opened`, 'screen view', `${page}Open`);
    this.props.navigation.navigate('InfoPages', { page });
  });

  renderInputItem = (props, index) => (
    <Input
      key={index}
      style={styles.input}
      inputStyle={styles.inputStyle}
      labelStyle={styles.label}
      selectionColor="rgba(255, 255, 255, 0.2)"
      {...props}
    />
  );

  renderSwitchItem = (props, index) => <SwitchItem key={index} {...props} />;

  renderListItem = ({ label, onPress, title }) => (
    <View style={styles.flex}>
      {label && <Text style={styles.labelDefault}>{label}</Text>}
      <TouchableOpacity
        style={styles.countryView}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <View style={styles.flex}>
          {title && <Text style={styles.countryText}>{title}</Text>}
        </View>
        <Icon style={styles.chevronIcon} name="chevron" size={16} color={color.white} />
      </TouchableOpacity>
      <Divider left={0} style={styles.dividerStyle}/>
    </View>
  );

  renderContainer = () => {
    const { navigation } = this.props;
    const { form, errors, loading, currentCountry } = this.state;
    const switches = prepareSwitchesBlock(
      form,
      { handleChangeField: this.handleChangeField, goToInfoPage: this.goToInfoPage }
    );
    const inputs = prepareInputsBlock({ ...form, errors }, { handleChangeField: this.handleChangeField });

    const placeholderWidth = Platform.OS === 'ios' ? 75 : 37;

    return (
      <Background>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          behavior="padding"
          style={styles.flex}
        >
          <ScrollView>
            <Header
              navigation={navigation}
              titleCenter
              title={strings('header.title.yourEnquiry')}
              leftButton={<BackBtn color={color.white} navigation={navigation}/>}
              rightButton={<View style={{ width: placeholderWidth }} />} // placeholder for title aligning
            />

            <View style={styles.empty}>
              <Text style={styles.labelTitle}>{strings('auth.text.oneTransportForYourBusiness')}</Text>
              {inputs.map(this.renderInputItem)}
              {this.renderListItem({
                label: strings('auth.label.selectPrimaryCountry'),
                onPress: this.goToSelectCountry,
                title: currentCountry.label
              })}
              {switches.map(this.renderSwitchItem)}
              <TextButton
                title={strings('auth.button.send')}
                disabled={!form.acceptTac || !form.acceptPp}
                loading={loading}
                onPress={this.handleSubmit}
                disabledContainerStyle={styles.disabledBtnContainer}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    );
  };

  render() {
    const { error } = this.state;

    return (
      <DismissKeyboardView style={styles.screen}>
        <StatusBar barStyle="light-content" />
        {this.renderContainer()}
        <Alert
          ref={(alert) => { this.alert = alert; }}
          position="top"
          type="failed"
          message={error}
        />
        <SuccessPopup
          innerRef={(popup) => { this.successPopup = popup; }}
          title={strings('popup.companyRequest.title')}
          content={strings('popup.companyRequest.description')}
        />
      </DismissKeyboardView>
    );
  }
}
