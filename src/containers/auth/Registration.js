import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, View, Text } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { auth } from 'api';

import {
  Icon,
  Alert,
  Input,
  DismissKeyboardView,
  Divider,
  Popup,
  Background
} from 'components';
import update from 'update-js/fp';

import { strings } from 'locales';
import { throttledAction, isInputsValid } from 'utils';

import { TextButton, SwitchItem } from './components';

import { prepareSwitchesBlock, prepareInputsBlock } from './utils';
import { registerCompanyRules } from './validatorRules';
import styles from './style';

const defaultCountry = {
  value: 'GB',
  label: 'United Kingdom'
};

const initialForm = {
  firstName: '',
  phoneNumber: '',
  email: '',
  name: '',
  lastName: '',
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
    const keys = ['firstName', 'phoneNumber', 'email', 'name'];
    if (isInputsValid(keys, this.state.form, registerCompanyRules, this.setErrors)) {
      this.setState({ loading: true, errors: null });
      auth.registerCompany(this.state.form)
        .then(this.handleRegisterSuccess)
        .catch(this.handleRegisterError);
    }
  };

  handleRegisterSuccess = () => {
    this.setState({ loading: false, form: initialForm });
    this.popup.open();
  };

  handleRegisterError = () => {
    this.setState({ loading: false, error: strings('login.errors.createCompany') }, this.showError);
  };

  goToSelectCountry = () => {
    this.props.navigation.navigate(
      'CountrySelector',
      { onSelect: this.handleChangeCountry, select: this.state.currentCountry }
    );
  };

  goToInfoPage = throttledAction((page) => {
    this.props.navigation.navigate('InfoPages', { page });
  });

  renderInputItem = (props, index) => (
    <Input
      key={index}
      style={styles.input}
      inputStyle={styles.inputStyle}
      labelStyle={styles.label}
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
        <Icon style={styles.chevronIcon} name="chevron" size={16} color="#FFF" />
      </TouchableOpacity>
      <Divider left={0} style={styles.dividerStyle}/>
    </View>
  );

  renderContainer = () => {
    const { form, errors, loading, currentCountry } = this.state;
    const switches = prepareSwitchesBlock(
      form,
      { handleChangeField: this.handleChangeField, goToInfoPage: this.goToInfoPage }
    );
    const inputs = prepareInputsBlock({ ...form, errors }, { handleChangeField: this.handleChangeField });

    return (
      <Background>
        <InputScrollView style={styles.containerView}>
          <View style={styles.empty}>
            <Text style={styles.labelTitle}>{strings('login.registerForm.title')}</Text>
            {inputs.map(this.renderInputItem)}
            {this.renderListItem({
              label: strings('login.registerForm.selectCountry'),
              onPress: this.goToSelectCountry,
              title: currentCountry.label
            })}
            {switches.map(this.renderSwitchItem)}
            <TextButton
              title={strings('login.signupButton')}
              disabled={!form.acceptTac || !form.acceptPp}
              loading={loading}
              onPress={this.handleSubmit}
              disabledContainerStyle={styles.disabledBtnContainer}
            />
          </View>
        </InputScrollView>
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
          position="bottom"
          type="failed"
          message={error}
        />
        <Popup
          ref={(popup) => { this.popup = popup; }}
          icon={<Icon size={70} name="registration" />}
          contentWraperStyle={styles.contentWraperStyle}
          titleStyle={styles.titleStyle}
          title={strings('information.companyRequest.title')}
          contentStyle={styles.popupInfo}
          content={strings('information.companyRequest.description')}
        />
      </DismissKeyboardView>
    );
  }
}
