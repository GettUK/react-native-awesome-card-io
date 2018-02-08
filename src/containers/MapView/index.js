import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition
} from 'actions/app/map';
import styles from './style';

class Map extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        setTimeout(() => {
          this.props.initialRegionPosition(position);
        }, 500);
        this.props.changePosition(position);
      },
      this.props.errorPosition,
      this.props.map.options
    );
    this.watchID = navigator.geolocation.watchPosition(
      this.props.changePosition,
      this.props.errorPosition,
      this.props.map.options
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  watchID = null;
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          onRegionChangeComplete={position =>
            this.props.changeRegionPosition(position)
          }
          region={this.props.map.regionPosition}>
          <MapView.Marker coordinate={this.props.map.currentPosition} />
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  // navigation: PropTypes.object.isRequired,
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
