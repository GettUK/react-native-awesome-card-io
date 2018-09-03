import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { Badge } from 'react-native-elements';
import { isNull, capitalize } from 'lodash';

import assets from 'assets';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { formatPrice } from 'utils';

import CarImage from './CarImage';

import styles from './styles';

const CarItem = ({
  style, name, label, price, theme, eta, active, onChange, isETADisabled, serviceType, localCurrencySymbol, localPrice
}) => {
  const vehiclePrice = (currency, cost) => (cost ? formatPrice(currency, cost) : strings('app.label.byMeter'));
  const etaNum = parseInt(String(eta).replace('< ', ''), 10);
  const serviceSpecificName = `${name}${capitalize(serviceType)}`;
  const renderBadge = () => (
    <Badge
      containerStyle={[styles.badgeStyle, active ? styles.badgeActiveStyle : {}]}
      wrapperStyle={styles.badgeWrapper}
    >
      <Text style={[styles.badgeTextStyle, { fontWeight: 'bold' }]}>{etaNum}</Text>
      <Text style={styles.badgeTextStyle}>{` ${strings('app.label.min')}`}</Text>
    </Badge>
  );
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
              {vehiclePrice('£', price)}
            </Text>
          }
          {!isNull(localCurrencySymbol) && !isNull(localPrice) &&
            <Text numberOfLines={1} style={[styles.label, { color: theme.color.secondaryText }]}>
              {localPrice ? formatPrice(localCurrencySymbol, localPrice) : ''}
            </Text>
          }
        </View>
        <CarImage
          size={!isNull(localPrice) ? 'extraSmall' : 'medium'}
          type={assets.carTypes[serviceSpecificName] ? serviceSpecificName : name}
          style={styles.image}
        />
      </View>
        {eta && !isETADisabled && renderBadge()}
    </View>
  );

  const renderActiveContainer = children => (
    <ImageBackground
      source={theme.type === 'dark' ? assets.carNightShadow : assets.carShadow}
      resizeMode="stretch"
      style={styles.activeBackground}
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
  localPrice: null,
  active: false,
  isETADisabled: false
};

export default withTheme(CarItem);
