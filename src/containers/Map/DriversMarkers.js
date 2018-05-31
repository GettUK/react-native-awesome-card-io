import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import Map from 'react-native-maps';
import { withNavigationFocus } from 'react-navigation';
import { Icon } from 'components';

const prepareCoordinates = location => location && ({ latitude: location.lat, longitude: location.lng });

const carMapping = {
  BlackTaxi: 'blackTaxi',
  BlackTaxiXL: 'blackTaxiXL'
};

class DriversMarkers extends PureComponent {
  componentDidMount() {
    this.initializePositionChanger();
  }

  componentDidUpdate(prevProps) {
    const { drivers } = this.props;
    if (drivers !== prevProps.drivers) {
      this.index = 0;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  cars = {};

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
    if (driver.locations[this.index].bearing >= 0) {
      animations.push(Animated.timing(
        this.cars[driver.id].rotation,
        { toValue: driver.locations[this.index].bearing, duration: 1000 }
      ));
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
    const { drivers, isFocused } = this.props;

    return (isFocused && drivers.map(driver => this.cars[driver.id] &&
      <Map.Marker.Animated
        key={driver.id}
        coordinate={this.cars[driver.id].coord}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
      >
        <Animated.View
          style={{
            transform:
              [{
                rotate: this.cars[driver.id].rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })
              }]
          }}
        >
          <Icon
            name={carMapping[driver.carType]}
            size={36}
          />
        </Animated.View>
      </Map.Marker.Animated>));
  }
}

export default withNavigationFocus(DriversMarkers);
