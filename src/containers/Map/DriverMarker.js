import React, { PureComponent } from 'react';
import Map from 'react-native-maps';
import { Icon } from 'components';

const prepareCoordinates = location => location && ({ latitude: location.lat, longitude: location.lng });

const carMapping = {
  BlackTaxi: 'blackTaxi',
  BlackTaxiXL: 'blackTaxiXL'
};

export default class DriverMarker extends PureComponent {
  state = {
    currentIndex: 0
  };

  currentLocation = new Map.AnimatedRegion(prepareCoordinates(this.getCurrentLocation()));

  componentDidMount() {
    this.initializePositionChanger();
  }

  componentDidUpdate(prevProps, prevState) {
    const { driver } = this.props;
    if (driver && driver !== prevProps.driver) {
      clearInterval(this.interval);
      this.setState({ currentIndex: 0 }, () => {
        this.animateToCurrentLocation();
        this.initializePositionChanger();
      });
    } else if (prevState.currentIndex !== this.state.currentIndex) {
      this.animateToCurrentLocation();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  get locationLength() {
    return this.props.driver.locations.length;
  }

  get duration() {
    return 5000 / this.locationLength;
  }

  initializePositionChanger = () => {
    this.interval = setInterval(() => {
      const { currentIndex } = this.state;
      if (currentIndex === this.locationLength - 1) {
        return clearInterval(this.interval);
      }
      return this.setState({ currentIndex: currentIndex + 1 });
    }, this.duration);
  };

  getCurrentLocation() {
    return this.props.driver.locations[this.state.currentIndex];
  }

  animateToCurrentLocation = () =>
    this.currentLocation.timing({
      ...prepareCoordinates(this.getCurrentLocation()),
      duration: 2 * this.duration
    }).start();

  render() {
    const { driver } = this.props;
    const location = this.getCurrentLocation() || {};

    return (
      <Map.Marker.Animated
        coordinate={this.currentLocation}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
      >
        <Icon
          name={carMapping[driver.carType]}
          size={36}
          style={location.bearing ? { transform: [{ rotate: `${location.bearing}deg` }] } : {}}
        />
      </Map.Marker.Animated>
    );
  }
}
