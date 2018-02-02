import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { changePosition, errorPosition } from 'actions/app/map';
import styles from './style';

class Map extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.props.changePosition,
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
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={0}
          showsUserLocation
          showsMyLocationButton
          zoomEnabled
          region={this.props.map.currentPosition}
        />
      </View>
    );
  }
}
Map.propTypes = {
  // navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired
};

const select = ({ app }) => ({
  map: app.map
});

const bindActions = {
  changePosition,
  errorPosition
};

export default connect(select, bindActions)(Map);
