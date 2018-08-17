import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { setInitialProfileValues, makeDefaultPhone } from 'actions/passenger';

import { Icon, CheckBox, Divider } from 'components';
import { strings } from 'locales';

import { withTheme } from 'providers';

import { color } from 'theme';

import { throttledAction } from 'utils';

import styles from './PaymentCards/styles';

class PhonesList extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  componentDidMount() {
    this.props.setInitialProfileValues();
  }

  goToSingleInputEditor = throttledAction((key) => {
    this.props.navigation.navigate('SingleInputEditor', {
      key, label: strings('header.title.phone'), theme: this.props.theme
    });
  });

  makeDefaultPhone = (type, data) => {
    if (data) this.props.makeDefaultPhone('defaultPhoneType', type);
  };

  renderItem = (type, data) => {
    const { defaultPhoneType, theme } = this.props;
    const isActiveStatus = defaultPhoneType === type;

    const labelStyles = [styles.paymentText, { color: theme.color.primaryText }];

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
                ? <Text style={labelStyles}>{data}</Text>
                : <Text style={labelStyles}>{strings('phones.label.addOtherPhone')}</Text>
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
      <ScrollView style={[styles.flex, styles.container, { backgroundColor: this.props.theme.color.bgPrimary }]}>
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

export default connect(mapState, mapDispatch)(withTheme(PhonesList));
