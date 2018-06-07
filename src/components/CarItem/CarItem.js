import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text, View, ImageBackground } from 'react-native';
import { isNull, capitalize } from 'lodash';
import { Icon } from 'components';
import assets from 'assets';
import { formatPrice } from 'utils';
import styles from './styles';

const CarItem = ({ style, name, label, price, eta, active, onChange, isETADisabled, serviceType }) => {
  const vehiclePrice = cost => (cost ? formatPrice(cost) : 'By meter');
  const etaNum = parseInt(String(eta).replace('< ', ''), 10);
  const range = Math.ceil(etaNum / 2);
  const serviceSpecificName = `${name}${capitalize(serviceType)}`;

  const renderContainer = () => (
    <View
      style={[
        styles.container,
        style,
        isETADisabled ? styles.containerSmall : {},
        active ? styles.activeContainer : {},
        active && isETADisabled ? styles.activeContainerSmall : {}
      ]}
    >
      <View style={styles.top}>
        {label && (<Text numberOfLines={1} style={styles.label}>{label}</Text>)}
        {!isNull(price) && (<Text numberOfLines={1} style={styles.labelPrice}>{vehiclePrice(price)}</Text>)}
      </View>
      {eta && !isETADisabled && (
        <View style={styles.middle}>
          <Icon style={styles.icon} name="clock" color="rgb(216,216,216)" width={16} height={16}/>
          <Text numberOfLines={1} style={styles.labelEta}>{`${etaNum}-${etaNum + range} min`}</Text>
        </View>)
      }
      <Image
        style={styles.image}
        source={assets.carTypes[serviceSpecificName] || assets.carTypes[name]}
        resizeMode="contain"
      />
    </View>
  );

  const renderActiveContainer = children => (
    <ImageBackground
      source={assets.carShadow}
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

export default CarItem;
