import React, { Fragment } from 'react';
import { StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Answers } from 'react-native-fabric';
import { compact } from 'lodash';

import { changeAddress } from 'actions/booking';
import { clearCoordinates } from 'actions/ui/map';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA, normalizeCoordinate, geocode, processLocation } from 'utils';
import { DRAG_DISABLED_STATUSES, ORDER_RECEIVED_STATUS } from 'utils/orderStatuses';

import MapStyle from './MapStyle';
import DarkMapStyle from './DarkMapStyle';

import styles from './styles';

class MapView extends React.Component {
  componentDidUpdate(prevProps) {
    const { regionToAnimate: oldRegion, coordinatesToResize: oldCoordinates, nightMode: oldNightMode } = prevProps;
    const { regionToAnimate, coordinatesToResize, nightMode } = this.props;

    if (nightMode !== oldNightMode) {
      setTimeout(() => this.map._updateStyle(), 500); // eslint-disable-line
    }

    if (regionToAnimate && !oldRegion) {
      this.animateToRegion(regionToAnimate);
    } else if (coordinatesToResize && !oldCoordinates) {
      this.resizeMapToCoordinates(coordinatesToResize);
    }
  }

  animateToRegion = (source) => {
    this.props.disableDrag();
    if (source && source.latitude && source.longitude) {
      this.map.animateToRegion({
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
        ...source
      });
    }

    this.props.clearCoordinates();
  };

  getMultiplier = () => (Platform.OS === 'android' ? 2.5 : 1);

  resizeMapToCoordinates = (coordinates, params) => {
    const multiplier = this.getMultiplier();

    this.map.fitToCoordinates(compact(coordinates), {
      edgePadding: { top: 80 * multiplier, bottom: 420 * multiplier, left: 100, right: 100, ...params },
      animated: true
    });

    this.props.clearCoordinates();
  };

  // eslint-disable-next-line consistent-return
  getGeocode = (region) => {
    const {
      isOrderCreating,
      dragEnable,
      changeAddress,
      order,
      regionToAnimate,
      coordinatesToResize,
      enableDrag,
      onStartLoadingPickup,
      onEndLoadingPickup
    } = this.props;

    if (!dragEnable) { return enableDrag(); }

    const availableCoordsToChange = regionToAnimate || coordinatesToResize;

    if (region && isOrderCreating && dragEnable && !order.destinationAddress && !availableCoordsToChange) {
      const coordinates = { lat: normalizeCoordinate(region.latitude), lng: normalizeCoordinate(region.longitude) };

      onStartLoadingPickup();
      Answers.logCustom('user moves location pin', { coordinates });
      geocode(coordinates)
        .then(processLocation)
        .then(data => changeAddress(data, { type: 'pickupAddress' }))
        .catch(onEndLoadingPickup);
    }
  };

  isScrollEnabled = order => (
    (order.status === ORDER_RECEIVED_STATUS && !order.asap)
    || !DRAG_DISABLED_STATUSES.some(status => status === order.status)
  )

  render() {
    const { isOrderCreating, order, nightMode } = this.props;

    return (
      <Fragment>
        <StatusBar barStyle={nightMode ? 'light-content' : 'default'} animated />

        <Map
          ref={(map) => { this.map = map; }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={this.isScrollEnabled(order)}
          rotateEnabled={false}
          showsCompass={false}
          mapPadding={{ bottom: !order.destinationAddress && isOrderCreating ? 185 : 0 }}
          scrollEnabled={this.isScrollEnabled(order)}
          customMapStyle={nightMode ? DarkMapStyle : MapStyle}
          onRegionChangeComplete={this.getGeocode}
        >
          {this.props.children}
        </Map>
      </Fragment>
    );
  }
}


const mapState = ({ ui }) => ({
  regionToAnimate: ui.map.coordinates.regionToAnimate,
  coordinatesToResize: ui.map.coordinates.coordinatesToResize
});

const mapDispatch = {
  changeAddress,
  clearCoordinates
};

export default connect(mapState, mapDispatch, null, { withRef: true })(MapView);
