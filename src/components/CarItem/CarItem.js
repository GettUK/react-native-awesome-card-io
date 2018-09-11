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
  const vehiclePrice = (cost, currency) => (cost ? formatPrice(cost, currency) : strings('app.label.byMeter'));
  const etaNum = parseInt(String(eta).replace('< ', ''), 10);
  const serviceSpecificName = `${name}${capitalize(serviceType)}`;
  const renderBadge = () => (
    <Badge
      containerStyle={[
        styles.badgeStyle,
        { backgroundColor: theme.color[active ? 'iconsSettigs' : 'pixelLine'] },
        { borderColor: theme.color.bgPrimary }
      ]}
      wrapperStyle={styles.badgeWrapper}
    >
      <Text
        style={[
          styles.badgeTextStyle,
          { fontWeight: 'bold' },
          { color: theme.formattedColor.white.opacity(active ? 1 : 0.6) }
        ]}
      >
        {etaNum}
      </Text>
      <Text
        style={[
          styles.badgeTextStyle,
          { color: theme.formattedColor.white.opacity(active ? 1 : 0.6) }
        ]}
      >
        {` ${strings('app.label.min')}`}
      </Text>
    </Badge>
  );
  const renderContainer = () => (
    <View style={styles.containerWrapper}>
      <View
        style={[
          styles.container,
          style,
          active ? styles.activeContainer : {},
          { backgroundColor: theme.color.bgPrimary },
          !isNull(localPrice) ? { paddingBottom: 0 } : {}
        ]}
      >
        <View style={styles.column}>
          <View style={styles.top}>
            {label &&
              <Text numberOfLines={1} style={[styles.label, { color: theme.color.secondaryText }]}>{label}</Text>
            }
            {!isNull(price) &&
              <Text numberOfLines={1} style={[styles.labelPrice, { color: theme.color.primaryText }]}>
                {vehiclePrice(price, '£')}
              </Text>
            }
            {!isNull(localCurrencySymbol) && !isNull(localPrice) &&
              <Text numberOfLines={1} style={[styles.label, { color: theme.color.secondaryText }]}>
                {localPrice ? formatPrice(localPrice, localCurrencySymbol) : ''}
              </Text>
            }
          </View>
          <CarImage
            size={!isNull(localPrice) ? 'extraSmall' : 'small'}
            type={assets.carTypes[serviceSpecificName] ? serviceSpecificName : name}
            style={styles.image}
          />
        </View>
      </View>
      {eta && !isETADisabled && renderBadge()}
    </View>
  );

  const renderActiveContainer = () => {
    const sourceImage = theme.type === 'dark' ? assets.carNightShadow : assets.carShadow;
    return (
      <ImageBackground
        source={active ? sourceImage : null}
        resizeMode="stretch"
        style={styles.activeBackground}
      >
        {renderContainer()}
      </ImageBackground>
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => !active && onChange(name)}>
      {renderActiveContainer()}
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
