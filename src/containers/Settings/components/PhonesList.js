import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { color } from 'theme';

import { setInitialProfileValues, makeDefaultPhone } from 'actions/passenger';

import { Icon, CheckBox, Divider } from 'components';
import { throttledAction } from 'utils';
import { strings } from 'locales';

import styles from './PaymentCards/styles';

class PhonesList extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  componentDidMount() {
    this.props.setInitialProfileValues();
  }

  goToSingleInputEditor = throttledAction((key) => {
    this.props.navigation.navigate('SingleInputEditor', { key, label: strings('header.title.phone') });
  });

  makeDefaultPhone = (type, data) => {
    if (data) this.props.makeDefaultPhone(type);
  };

  renderItem = (type, data) => {
    const { defaultPhoneType } = this.props;
    const isActiveStatus = defaultPhoneType === type;

    return (
      <View key={type}>
        <View style={[styles.commonContainer, styles.paymentWrapper]}>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              status={isActiveStatus}
              onPress={this.makeDefaultPhone.bind(null, type, data)}
            />
          </View>
          <TouchableOpacity
            style={styles.paymentView}
            activeOpacity={0.6}
            onPress={this.goToSingleInputEditor.bind(null, type)}
          >
            <View style={[styles.flex, styles.viewItem]}>
              {data
                ? <Text style={styles.paymentText}>{data}</Text>
                : <Text style={styles.paymentText}>{strings('phones.label.addOtherPhone')}</Text>
              }
            </View>
            <Icon style={styles.chevronIcon} name="chevron" size={16} color={color.arrowRight} />
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    );
  };

  renderPhone = (type) => {
    const data = this.props[type];

    return data ? this.renderItem(type, data) : this.renderItem(type);
  };

  render() {
    return (
      <ScrollView style={[styles.flex, styles.container]}>
        {this.renderPhone('phone')}
        {this.renderPhone('mobile')}
      </ScrollView>
    );
  }
}

const mapState = ({ passenger: { data } }) => ({
  phone: data.passenger.phone,
  mobile: data.passenger.mobile,
  defaultPhoneType: data.passenger.defaultPhoneType
});

const mapDispatch = {
  makeDefaultPhone,
  setInitialProfileValues
};

export default connect(mapState, mapDispatch)(PhonesList);
