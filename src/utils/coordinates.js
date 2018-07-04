import { Platform } from 'react-native';

import { errorPosition } from 'actions/ui/map';

import { geocode, processLocation, normalizeCoordinate } from 'utils';

const geoLocationOptions = {
  timeout: 2500,
  distanceFilter: 10,
  enableHighAccuracy: Platform.OS === 'android'
};

class Coordinates {
  // eslint-disable-next-line class-methods-use-this
  getNavigatorLocation(onLoadCoordinate, onGetGeocode) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = { lat: normalizeCoordinate(coords.latitude), lng: normalizeCoordinate(coords.longitude) };

        geocode(coordinates)
          .then(processLocation)
          .then(data => onGetGeocode(data, { type: 'pickupAddress' }));

        onLoadCoordinate(coords);
      },
      errorPosition,
      { timeout: geoLocationOptions.timeout }
    );
  }

  watchCoordinates(onLoadCoordinate, onGetGeocode) {
    this.getNavigatorLocation(onLoadCoordinate, onGetGeocode);
    this.watchId = navigator.geolocation.watchPosition(
      ({ coords }) => onLoadCoordinate(coords),
      errorPosition,
      geoLocationOptions,
    );
  }

  clearWatcher() {
    navigator.geolocation.clearWatch(this.watchId);
  }
}

export default new Coordinates();
