import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from 'components';

import assets from 'assets';

import styles from './styles';

export default class PromoBlackTaxi extends PureComponent {
  state = {
    animationType: 'fadeInDown'
  }

  handleSelect = () => {
    this.props.onSelect();

    this.handleClose();
  }

  handleClose = () => {
    this.setState({ animationType: 'fadeOutUp' }, () => {
      setTimeout(this.props.onClose, 1000);
    });
  }

  render() {
    return (
      <Animatable.View animation={this.state.animationType} style={[styles.container, styles.row]}>
        <TouchableWithoutFeedback delay={500} onPress={this.handleSelect}>
          <View style={styles.row}>
            <View style={styles.logoPlaceholder} />
            <Animatable.Image animation="fadeInLeft" delay={1000} source={assets.blackCabPromo} style={styles.logo} />

            <Text style={styles.label}>Choose Black Taxi for quickest arrival times</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.icon} onPress={this.handleClose}>
          <Icon name="close" color="#fff" size={14} />
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}
