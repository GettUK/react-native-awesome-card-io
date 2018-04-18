import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, BackHandler, Image, Text, TouchableWithoutFeedback } from 'react-native';

import assets from 'assets';

import { setInitialProfileValues, changeProfileFieldValue, touchField } from 'actions/passenger';

import { Icon } from 'components';

import { baseVehicles } from 'containers/shared/bookings/data';

import { strings } from 'locales';

import { showConfirmationAlert } from 'utils';

import styles from './CarTypesEditorStyles';

class CarTypesEditor extends Component {
  static propTypes = {
    changeProfileFieldValue: PropTypes.func
  };

  static defaultProps = {
    input: ''
  };

  componentWillMount() {
    this.props.setInitialProfileValues();

    this.backListener = BackHandler.addEventListener('backPress', () => {
      const { touched } = this.props;

      if (touched) {
        showConfirmationAlert({ title: strings('goBack'), handler: this.goBack });
        return true;
      }

      this.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.props.touchField('profile', false);

    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  goBack = () => this.props.navigation.goBack(null);

  handleOpenInfo = () => {
    // TODO: waiting for design of info modal
  }

  renderCarItem = ({ name, label }) => {
    const isSelected = this.props.vehicle === name;

    return (
      <TouchableWithoutFeedback
        key={name}
        onPress={this.props.changeProfileFieldValue.bind(null, 'defaultVehicle', name)}
      >
        <View style={styles.itemContainer}>
          <View style={styles.button}>
            {isSelected
              ? <Icon name="selected" />
              : <View style={styles.checkPlaceholder} />}
          </View>
          <Image
            style={styles.image}
            source={assets.carTypes[name]}
            resizeMode="contain"
          />
          <Text style={styles.label}>{label}</Text>
          <TouchableWithoutFeedback onPress={this.handleOpenInfo}>
            <View style={styles.button}>
              <Icon name="vehicleInfo" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={[styles.flex, styles.container]}>
        {baseVehicles.map(this.renderCarItem)}
      </View>
    );
  }
}

const mapState = ({ passenger }) => ({
  touched: passenger.temp.profileTouched,
  vehicle: passenger.temp.defaultVehicle
});

const mapDispatch = {
  setInitialProfileValues,
  changeProfileFieldValue,
  touchField
};

export default connect(mapState, mapDispatch)(CarTypesEditor);
