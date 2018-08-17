import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, BackHandler, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { setInitialProfileValues, changeProfileFieldValue, touchField } from 'actions/passenger';

import { Icon, Modal, CheckBox, CarImage } from 'components';

import { baseVehicles, baseVehiclesDescriptions } from 'containers/shared/bookings/data';

import { strings } from 'locales';

import { withTheme } from 'providers';

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
      const { touched, theme } = this.props;

      if (touched) {
        showConfirmationAlert({ theme, title: strings('alert.title.goBack'), handler: this.goBack });
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
    const { theme } = this.props;
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
        contentStyles={[styles.modalContent, { backgroundColor: theme.color.bgPrimary }]}
      >
        <View style={styles.modalWrapper}>
          <Text style={[styles.modalHeader, { color: theme.color.primaryText }]}>{label}</Text>

          <CarImage
            style={styles.carWrapper}
            size="big"
            type={currentCar}
            animatable
            duration={CAR_ANIMATION_DURATION}
          />

          <Text style={[styles.modalDesc, { color: theme.color.primaryText }]}>{info.description}</Text>

          <View style={styles.featuresBlock}>
            {features.map((feature, index) => (
              <View key={feature} style={styles.featuresItem}>
                <View style={styles.checkmark}>
                  <Icon name="checkmark" width={13} height={10} />
                  <Animatable.View
                    style={[styles.checkmarkHider, { backgroundColor: theme.color.bgPrimary }]}
                    animation="slideOutRight"
                    delay={OPTIONS_DELAY + (index * 300)}
                    duration={OPTION_ANIMATION_DURATION}
                  />
                </View>

                <Animatable.Text
                  style={[styles.featuresLabel, { color: theme.color.primaryText }]}
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
            style={[styles.feesDesc, { color: theme.color.secondaryText }]}
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
        <View style={[styles.itemContainer, { borderBottomColor: this.props.theme.color.pixelLine }]}>
          <View style={styles.button}>
            <CheckBox status={isSelected} onPress={handler} />
          </View>

          <CarImage type={name} style={styles.image} size="small" />

          <Text style={[styles.label, { color: this.props.theme.color.primaryText }]}>{label}</Text>
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
      <View style={[styles.flex, styles.container, { backgroundColor: this.props.theme.color.bgPrimary }]}>
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

export default connect(mapState, mapDispatch)(withTheme(CarTypesEditor));
