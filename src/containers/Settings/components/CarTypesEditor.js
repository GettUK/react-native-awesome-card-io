import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, BackHandler, Image, Text, TouchableWithoutFeedback } from 'react-native';

import assets from 'assets';

import { setInitialProfileValues, changeProfileFieldValue, touchField } from 'actions/passenger';

import { Icon, Modal } from 'components';

import { baseVehicles, baseVehiclesDescriptions } from 'containers/shared/bookings/data';

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

  state = {
    isModalVisible: false,
    currentCar: ''
  }

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

  handleOpenInfo = (name) => {
    this.setState({ isModalVisible: true, currentCar: name });
  }

  closeInfo = () => {
    this.setState({ isModalVisible: false, currentCar: '' });
  }

  renderInfoModal = () => {
    const { currentCar } = this.state;
    const label = (baseVehicles.find(vehicle => vehicle.name === currentCar) || {}).label;
    const info = baseVehiclesDescriptions[currentCar] || {};

    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onClose={this.closeInfo}
        contentStyles={styles.modalContent}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.modalHeader}>{label}</Text>

          <Image
            style={styles.modalCarImage}
            source={assets.carTypes[this.state.currentCar]}
            resizeMode="contain"
          />

          <Text style={styles.modalDesc}>{info.description}</Text>

          <View style={styles.featuresBlock}>
            {(info.features || []).map(feature => (
              <View key={feature} style={styles.featuresItem}>
                <Icon name="checkmark" width={13} height={10} />
                <Text style={styles.featuresLabel}>{feature}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.feesDesc}>{info.price}</Text>
        </View>
      </Modal>
    );
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
          <TouchableWithoutFeedback onPress={this.handleOpenInfo.bind(null, name)}>
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

        {this.renderInfoModal()}
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
