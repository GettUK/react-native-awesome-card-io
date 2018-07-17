import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import Map from 'react-native-maps';
import { withNavigationFocus } from 'react-navigation';

import { Icon } from 'components';

import { prepareCoordinates } from 'utils';

const carMapping = {
  BlackTaxi: 'blackTaxi',
  BlackTaxiXL: 'blackTaxiXL',
  Taxi: 'car'
};

class DriversMarkers extends PureComponent {
  state = {
    resetNeeded: false
  };

  componentDidMount() {
    this.initializePositionChanger();
  }

  componentDidUpdate(prevProps) {
    const { drivers, nightMode } = this.props;
    if (drivers !== prevProps.drivers) {
      this.index = 0;
    }
    this.setState({ resetNeeded: nightMode !== prevProps.nightMode });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  cars = {};

  carsRefs = {};

  index = 0;

  setNewCar = (driver) => {
    this.cars[driver.id] = {
      coord: new Map.AnimatedRegion(prepareCoordinates(driver.locations[0])),
      rotation: new Animated.Value(driver.locations[0].bearing),
      ts: driver.locations[0].ts
    };
  };

  updateCar = (driver) => {
    const animations = [];
    animations.push(this.cars[driver.id].coord.timing({
      ...prepareCoordinates(driver.locations[this.index]),
      duration: 1000
    }));
    if (this.carsRefs[driver.id]) {
      this.carsRefs[driver.id].setNativeProps({ rotation: driver.locations[this.index].bearing });
    }
    this.cars[driver.id].ts = driver.locations[this.index].ts;
    return animations;
  };

  initializePositionChanger = () => {
    let animations = [];
    this.interval = setInterval(() => {
      if (!this.props.isFocused) return;

      this.props.drivers.forEach((driver) => {
        if (!this.cars[driver.id]) {
          this.setNewCar(driver);
        } else if (driver.locations[this.index] && driver.locations[this.index].ts > this.cars[driver.id].ts) {
          animations.push(...this.updateCar(driver));
        }
      });

      Animated.parallel(animations).start();

      animations = [];

      this.index += 1;
    }, 1000);
  };

  render() {
    const { drivers, isFocused, nightMode } = this.props;
    const { resetNeeded } = this.state;

    return (isFocused && !resetNeeded && drivers.map(driver => this.cars[driver.id] &&
      <Map.Marker.Animated
        key={driver.id}
        coordinate={this.cars[driver.id].coord}
        ref={(el) => { this.carsRefs[driver.id] = el; } }
        anchor={{ x: 0.5, y: 0.7838 }}
        tracksViewChanges={false}
      >
        <Icon
          name={`${carMapping[driver.carType]}${nightMode ? 'NightMode' : ''}`}
          width={36}
          height={80}
        />
      </Map.Marker.Animated>));
  }
}

export default withNavigationFocus(DriversMarkers);
