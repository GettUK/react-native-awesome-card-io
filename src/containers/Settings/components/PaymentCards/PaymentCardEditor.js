import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { curry } from 'lodash';
import { View, KeyboardAvoidingView, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

import { changePaymentField, changePaymentFields, resetPaymentFields } from 'actions/passenger';
import { throttledAction } from 'utils';

import { Input, DismissKeyboardView, Modal, Icon, Divider } from 'components';

import { extractedDate, getValue, helpInfo, prepareCardEditor, prepareCardEditorInputs } from './utils';
import styles from './styles';


class PaymentCardEditor extends Component {
  state = {
    type: 'cvv',
    isVisible: false
  };

  static propTypes = {
    navigation: PropTypes.object
  };

  componentWillUnmount() {
    this.props.resetPaymentFields();
  }

  handleMaskInputChange = curry((field, formatted, extracted) => {
    this.props.changePaymentField(field, extracted);
  });

  handleInputChange = curry((field, value) => {
    this.props.changePaymentField(field, value);
  });

  handleExpirationDate = (formatted) => {
    const { month, year } = extractedDate(formatted);

    this.props.changePaymentFields({
      expirationMonth: parseInt(month, 10),
      expirationYear: year
    });
  };

  handleSubmit = () => {
    this.goBack();
  };

  closaModal = () => {
    this.setState({ isVisible: false });
  };

  openModal = () => {
    this.setState({ isVisible: true });
  };

  changeType = (type) => {
    this.setState({ type });
  };

  onHelpPress = (type) => {
    this.changeType(type);
    this.openModal();
  };

  goToPaymentCardTypes = throttledAction(() => {
    this.props.navigation.navigate('PaymentCardTypes', {});
  });

  renderInfo = (type) => {
    const info = helpInfo[type];
    return type && (
      <View style={styles.infoView}>
        {info.label && <Text style={styles.infoLabel}>{info.label}</Text>}
        <View style={styles.infoUnderView}>
          {info.text && <Text style={styles.infoText}>{info.text}</Text>}
          {info.image && <Image style={styles.infoImage} source={info.image} resizeMode="contain" />}
        </View>
      </View>
    );
  };

  renderInput = props => (
    <Input
      key={props.label}
      labelStyle={styles.inputLabel}
      inputStyle={styles.input}
      style={styles.inputContainer}
      errorStyle={styles.error}
      allowClear
      helpIconColor="#979797"
      helpIconStyle={styles.helpIcon}
      clearIconColor="#d2d0dc"
      clearIconStyle={styles.clearIcon}
      selectionColor="#494949"
      {...props}
    />
  );

  renderItem = ({ label, text, onPress }) => (
    <View key={label} style={[styles.commonContainer, styles.paymentCardWrapper]}>
      <TouchableOpacity
        style={styles.paymentView}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <View style={styles.flex}>
          <Text style={styles.paymentCardLabel}>{getValue(label)}</Text>
          <Text style={styles.paymentCardText}>{getValue(text)}</Text>
        </View>
        <Icon style={styles.chevronIcon} name="chevron" size={16} color="#c7c7cc" />
      </TouchableOpacity>
      <Divider left={0} />
    </View>
  );

  renderFields =() => {
    const { paymentCard, error } = this.props;
    return (
      <ScrollView>
        {prepareCardEditor(paymentCard, {
            goToPaymentCardTypes: this.goToPaymentCardTypes
          }).map(this.renderItem)
        }
        {prepareCardEditorInputs({ ...paymentCard, error }, {
            handleMaskInputChange: this.handleMaskInputChange,
            handleInputChange: this.handleInputChange,
            handleExpirationDate: this.handleExpirationDate,
            onHelpPress: this.onHelpPress
          }).map(this.renderInput)
        }
      </ScrollView>
    );
  };

  render() {
    const { isVisible, type } = this.state;
    return (
      <View style={[styles.flex, styles.container]}>
        <DismissKeyboardView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={80}
            behavior="padding"
            style={styles.flex}
          >
            <View style={styles.flex}>
              {this.renderFields()}
              <Modal
                isVisible={isVisible}
                onClose={this.closaModal}
              >
                {this.renderInfo(type)}
              </Modal>
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
      </View>
    );
  }
}

const mapState = ({ passenger }) => ({
  paymentCard: passenger.newPaymentData,
  error: passenger.validationPaymentError
});

const mapDispatch = {
  changePaymentField,
  changePaymentFields,
  resetPaymentFields
};

export default connect(mapState, mapDispatch)(PaymentCardEditor);
