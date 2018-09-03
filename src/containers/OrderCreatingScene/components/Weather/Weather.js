import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { startCase } from 'lodash';
import moment from 'moment';

import { getForecast } from 'actions/ui/weather';

import { Icon, Button, Divider, GradientWrapper } from 'components';
import { withTheme } from 'providers';
import styles from './styles';
import { getWeatherIcon, convertDegToCompass, getGradientColors, getTemp } from './utils';

const { width } = Dimensions.get('window');

class Weather extends PureComponent {
  state = {
    isModalOpened: false
  };

  openModal = () => {
    this.setState({ isModalOpened: true });
    this.props.getForecast();
  };

  closeModal = () => this.setState({ isModalOpened: false });

  renderWeatherDetails = () => {
    const { weather: { current, forecast } } = this.props;
    const forecastTemp = forecast.list.length > 0 && forecast.list[0].temp;

    return (
      <GradientWrapper
        colors={getGradientColors(current.weather[0].icon)}
        style={styles.dayWeatherContainer}
      >
        <Icon
          name="weather.dayBackground"
          height={(width - 30) / 3.8}
          width={width - 30}
          style={styles.dayBackground}
        />
        <View style={styles.dayWeatherContent}>
          <View>
            <Text style={styles.city}>{current.name}</Text>
            <Text style={styles.temperatureHuge}>{getTemp(current.main.temp)}</Text>
            <Text style={styles.description}>{startCase(current.weather[0].description)}</Text>
            <Text style={styles.description}>
              {moment().format('dddd')} {forecastTemp && `${getTemp(forecastTemp.max)}/${getTemp(forecastTemp.min)}`}
            </Text>
          </View>
          <View style={styles.dayWeatherRight}>
            <Icon name={`weather.${getWeatherIcon(current.weather[0].icon)}`} color="#fff" size={88} />
            <View style={styles.valueRow}>
              <Icon name="weather.humidity" size={12} style={styles.valueIcon} />
              <Text style={styles.description}>Humidity</Text>
              <Text style={[styles.description, styles.value]}>{current.main.humidity}%</Text>
            </View>
            <View style={styles.valueRow}>
              <Icon name="weather.wind" size={12} style={styles.valueIcon} />
              <Text style={styles.description}>Wind</Text>
              <Text style={[styles.description, styles.value]}>
                {convertDegToCompass(current.wind.deg)} {current.wind.speed}m/s
              </Text>
            </View>
          </View>
        </View>
      </GradientWrapper>
    );
  };

  renderWeatherForecast = () => {
    const { weather: { forecast }, theme } = this.props;
    return (
      <View style={styles.forecast}>
        {forecast.list.map(day => (
          <View key={day.dt} style={styles.forecastDay}>
            <Text style={[styles.dayTitle, { color: theme.color.forecastNightTemp }]}>
              {moment.unix(day.dt).format('ddd')}
            </Text>
            <Icon style={styles.forecastIcon} name={`weather.${getWeatherIcon(day.weather[0].icon)}`} size={33} />
            <Text style={[styles.forecastDayTemp, { color: theme.color.forecastDayTemp }]}>
              {getTemp(day.temp.max)}
            </Text>
            <Text style={[styles.forecastNightTemp, { color: theme.color.forecastNightTemp }]}>
              {getTemp(day.temp.min)}
            </Text>
            <View style={styles.row}>
              <Icon
                style={styles.forecastHumidityIcon}
                name="weather.humidity"
                size={10}
                color={theme.color.forecastNightTemp}
              />
              <Text style={[styles.forecastHumidity, { color: theme.color.forecastNightTemp }]}>{day.humidity}%</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  renderSpinner = () => (
    <View style={styles.spinnerWrapper}>
      <ActivityIndicator color={this.props.theme.color.primaryBtns} />
    </View>
  );

  renderWeatherModal = () => {
    const { theme, weather: { forecast } } = this.props;
    return (
      <Modal
        isVisible={this.state.isModalOpened}
        style={[styles.container]}
        backdropColor={theme.color.backdrop}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.color.bgPrimary }]}>
          {this.renderWeatherDetails()}
          <View style={styles.forecastContent}>
            {forecast.busy ? this.renderSpinner() : this.renderWeatherForecast()}
            <Divider left={0} style={styles.modalDivider} />
            <Button
              style={styles.closeBtnWrapper}
              styleContent={styles.closeBtn}
              onPress={this.closeModal}
              size="sm"
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  renderWeatherBtn = () => {
    const { weather: { current }, theme } = this.props;

    return (
      <Button
        styleContent={[styles.weatherBtn, { backgroundColor: theme.color.bgPrimary }]}
        onPress={this.openModal}
      >
        <Text style={[styles.temperature, { color: theme.color.primaryBtns }]}>
          {getTemp(current.main.temp)}
        </Text>
        <Divider left={0} style={styles.divider} />
        <Icon name={`weather.${getWeatherIcon(current.weather[0].icon)}`} size={33} />
      </Button>
    );
  };

  render() {
    const { weather: { current } } = this.props;

    if (!current.main) return null;

    return (
      <Fragment>
        {this.renderWeatherBtn()}
        {this.renderWeatherModal()}
      </Fragment>
    );
  }
}

const select = ({ ui }) => ({
  weather: ui.weather
});

const bindActions = {
  getForecast
};

export default connect(select, bindActions)(withTheme(Weather));

