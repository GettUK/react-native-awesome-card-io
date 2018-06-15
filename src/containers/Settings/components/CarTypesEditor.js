import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, BackHandler, Image, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import assets from 'assets';

import { setInitialProfileValues, changeProfileFieldValue, touchField } from 'actions/passenger';

import { Icon, Modal, CheckBox } from 'components';

import { baseVehicles, baseVehiclesDescriptions, OTcars } from 'containers/shared/bookings/data';

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
  };

  componentDidMount() {
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
  };

  closeInfo = () => {
    this.setState({ isModalVisible: false, currentCar: '' });
  };

  renderInfoModal = () => {
    const { currentCar } = this.state;
    const label = (baseVehicles.find(vehicle => vehicle.name === currentCar) || {}).label;
    const info = baseVehiclesDescriptions[currentCar] || {};
    const features = info.features || [];

    const CAR_ANIMATION_DURATION = 800;
    const OPTION_ANIMATION_DURATION = 1500;
    const OPTIONS_DELAY = CAR_ANIMATION_DURATION * 2;

    return (
      <Modal
        isVisible={this.state.isModalVisible}
        onClose={this.closeInfo}
        contentStyles={styles.modalContent}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.modalHeader}>{label}</Text>

          <View style={styles.carWrapper}>
            <Animatable.Image
              animation="slideInLeft"
              duration={CAR_ANIMATION_DURATION}
              delay={200}
              style={styles.modalCarImage}
              source={assets.noServiceCarTypes[this.state.currentCar]}
              resizeMode="contain"
            />

            <Animatable.View
              animation="slideInLeft"
              duration={CAR_ANIMATION_DURATION}
              delay={CAR_ANIMATION_DURATION}
            >
              <Icon
                size={62}
                name={OTcars.includes(this.state.currentCar) ? 'OT' : 'Gett'}
                style={styles.logoService}
              />
            </Animatable.View>
          </View>

          <Text style={styles.modalDesc}>{info.description}</Text>

          <View style={styles.featuresBlock}>
            {features.map((feature, index) => (
              <View key={feature} style={styles.featuresItem}>
                <View style={styles.checkmark}>
                  <Icon name="checkmark" width={13} height={10} />
                  <Animatable.View
                    style={styles.checkmarkHider}
                    animation="slideOutRight"
                    delay={OPTIONS_DELAY + (index * 300)}
                    duration={OPTION_ANIMATION_DURATION}
                  />
                </View>

                <Animatable.Text
                  style={styles.featuresLabel}
                  animation="fadeIn"
                  delay={OPTIONS_DELAY + (index * 300)}
                  duration={OPTION_ANIMATION_DURATION}
                >
                  {feature}
                </Animatable.Text>
              </View>
            ))}
          </View>

          <Animatable.Text
            style={styles.feesDesc}
            animation="fadeIn"
            delay={OPTIONS_DELAY + (features.length * 300)}
            duration={OPTION_ANIMATION_DURATION}
          >
            {info.price}
          </Animatable.Text>
        </View>
      </Modal>
    );
  };

  renderCarItem = ({ name, label }) => {
    const isSelected = this.props.vehicle === name;
    const handler = this.props.changeProfileFieldValue.bind(null, 'defaultVehicle', name);

    return (
      <TouchableWithoutFeedback
        key={name}
        onPress={handler}
      >
        <View style={styles.itemContainer}>
          <View style={styles.button}>
            <CheckBox status={isSelected} onPress={handler} />
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
  };

  render() {
    return (
      <View style={[styles.flex, styles.container]}>
        <ScrollView style={styles.flex}>
          {baseVehicles.map(this.renderCarItem)}
        </ScrollView>

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
