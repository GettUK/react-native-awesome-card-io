import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
    const {map: {options}} = this.props;
    navigator.geolocation.getCurrentPosition(
      position => {
        setTimeout(() => {
          this.props.initialRegionPosition(position);
        }, 500);
        this.props.changePosition(position);
      },
      this.props.errorPosition,
      options
    );
    this.watchID = navigator.geolocation.watchPosition(
      this.props.changePosition,
      this.props.errorPosition,
      options
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  watchID = null;
  render() {
    const {map: {currentPosition, regionPosition}} = this.props;
    return (
      <View style={styles.container}>
        <Header
          customStyles={styles.header}
          leftButton={(
            <View style={styles.headerLeftView}>
              <NavImageButton
                onClick={() => this.props.navigation.navigate('SettingsView', {})}
                styleContainer={{ justifyContent: 'center' }}
                styleView={{ marginLeft: 10 }}
                styleImage={{ width: 21, height: 14 }}
                source={assets.hamburgerMenu}
              />
            </View>
          )}
        />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          onRegionChangeComplete={position =>
            this.props.changeRegionPosition(position)
          }
          region={regionPosition}>
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
