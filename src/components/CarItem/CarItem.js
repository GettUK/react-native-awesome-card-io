import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { isNull, capitalize } from 'lodash';

import { Icon } from 'components';

import assets from 'assets';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { formatPrice } from 'utils';

import CarImage from './CarImage';

import styles from './styles';

const CarItem = ({ style, name, label, price, theme, eta, active, onChange, isETADisabled, serviceType }) => {
  const vehiclePrice = cost => (cost ? formatPrice(cost) : strings('app.label.byMeter'));
  const etaNum = parseInt(String(eta).replace('< ', ''), 10);
  const serviceSpecificName = `${name}${capitalize(serviceType)}`;

  const renderContainer = () => (
    <View
      style={[
        styles.container,
        style,
        isETADisabled ? styles.containerSmall : {},
        active ? styles.activeContainer : {},
        active && isETADisabled ? styles.activeContainerSmall : {},
        { backgroundColor: theme.color.bgPrimary }
      ]}
    >
      <View style={[styles.column, !active && styles.deselected]}>
        <View style={styles.top}>
          {label &&
            <Text numberOfLines={1} style={[styles.label, { color: theme.color.secondaryText }]}>{label}</Text>
          }
          {!isNull(price) &&
            <Text numberOfLines={1} style={[styles.labelPrice, { color: theme.color.primaryText }]}>
              {vehiclePrice(price)}
            </Text>
          }
        </View>
        {eta && !isETADisabled &&
          <View style={styles.middle}>
            <Icon style={styles.icon} name="clock" color={theme.color.pixelLine} width={16} height={16}/>
            <Text numberOfLines={1} style={[styles.labelEta, { color: theme.color.secondaryText }]}>
              {`${etaNum} min`}
            </Text>
          </View>
        }

        <CarImage
          type={assets.carTypes[serviceSpecificName] ? serviceSpecificName : name}
          style={styles.image}
        />
      </View>
    </View>
  );

  const renderActiveContainer = children => (
    <ImageBackground
      source={theme.type === 'dark' ? assets.carNightShadow : assets.carShadow}
      resizeMode="stretch"
      style={[styles.activeBackground, isETADisabled ? styles.activeBackgroundSmall : {}]}
    >
      {children}
    </ImageBackground>
  );

  const content = renderContainer();

  return (
    <TouchableOpacity onPress={() => !active && onChange(name)}>
      {active ? renderActiveContainer(content) : content}
    </TouchableOpacity>
  );
};

CarItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  eta: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  label: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  active: PropTypes.bool,
  isETADisabled: PropTypes.bool
};

CarItem.defaultProps = {
  style: {},
  name: 'Standard',
  eta: '',
  price: null,
  active: false,
  isETADisabled: false
};

export default withTheme(CarItem);
