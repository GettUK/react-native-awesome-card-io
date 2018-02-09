import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StatusBar, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon, Button } from 'components';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';
import {
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition
} from 'actions/app/map';
import assets from 'assets';
import styles from './style';

class Map extends Component {
  componentDidMount() {
    const { map: { options } } = this.props;
    setTimeout(() => {
      this.getCurrentPosition();
    }, 500);
    this.watchID = navigator.geolocation.watchPosition(
      this.props.changePosition,
      this.props.errorPosition,
      options
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  getCurrentPosition = () => {
    const { map: { options } } = this.props;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.initialRegionPosition(position);
        this.props.changePosition(position);
      },
      this.props.errorPosition,
      options
    );
  };
  watchID = null;
  render() {
    const { map: { currentPosition, regionPosition } } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Header
          customStyles={[styles.header]}
          leftButton={
            <NavImageButton
              onClick={() =>
                this.props.navigation.navigate('SettingsView', {})
              }
              styleContainer={{ justifyContent: 'center' }}
              styleImage={{ width: 21, height: 14 }}
              source={assets.hamburgerMenu}
            />
          }
          rightButton={
            <Button style={styles.orderBtn} raised={false} size="sm">
              <Text style={styles.orderBtnText}>Orders</Text>
            </Button>
          }
        />
        <Button style={styles.pickUpBtn}>
          <Icon style={styles.pickUpIcon} name="pickUpField" size={18} />
          <Text style={styles.pickUpText} numberOfLines={1}>
            11 Soho Square, Soho, London W1D sdfsdlfjsldk flsd flssdfsdf sdf sdf sdf df
          </Text>
        </Button>
        <View style={styles.footer}>
          <Button style={styles.currentPositionBtn} onPress={this.getCurrentPosition}>
            <Icon name="myLocation" height={22} fill="#284784" />
          </Button>
          <View style={styles.destinationBtns}>
            <Button style={styles.destinationBtn}>
              <Icon style={styles.searchIcon} name="search" stroke="#284784" size={18} />
              <Text style={styles.selectDestinationText}>Select Destination</Text>
            </Button>
            <Button style={styles.destinationBtn}>
              <Text style={styles.customDestinationText}>Home</Text>
            </Button>
            <Button style={styles.destinationBtn}>
              <Text style={styles.customDestinationText}>Work</Text>
            </Button>
          </View>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          onRegionChangeComplete={position =>
            this.props.changeRegionPosition(position)
          }
          region={regionPosition}
        >
          <MapView.Marker coordinate={currentPosition} />
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  initialRegionPosition: PropTypes.func.isRequired,
  changeRegionPosition: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired
};

Map.defaultProps = {};

const select = ({ app }) => ({
  map: app.map
});

const bindActions = {
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition
};

export default connect(select, bindActions)(Map);
