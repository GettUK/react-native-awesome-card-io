import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { upperFirst } from 'lodash';

import assets from 'assets';

import { Icon } from 'components';

import { OTcars } from 'containers/shared/bookings/data';

import styles from './CarImageStyles';

class CarImage extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    duration: PropTypes.number,
    type: PropTypes.string,
    size: PropTypes.oneOf(['extraSmall', 'small', 'medium', 'big']),
    animatable: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    duration: 400,
    type: 'BlackTaxi',
    size: 'medium',
    animatable: false
  };

  getLogoIconName = () => {
    const { type } = this.props;
    if (type === 'Chauffeur') {
      return 'Carey';
    } else if (OTcars.includes(type)) {
      return 'OT';
    }
    return 'Gett';
  };

  renderLogo = (sizeFormatted) => {
    const { size, animatable, duration } = this.props;
    const sizes = {
      extraSmall: 18,
      small: 28,
      medium: 34,
      big: 62
    };

    const IconWrapper = animatable ? Animatable.View : View;

    return (
      <IconWrapper
        style={styles.typeWrapper}
        animation="slideInLeft"
        duration={duration}
        delay={duration}
      >
        <View style={styles[`typeInnerWrapper${sizeFormatted}`]}>
          <Icon
            size={sizes[size]}
            name={this.getLogoIconName()}
            style={styles[`logoService${sizeFormatted}`]}
          />
        </View>
      </IconWrapper>
    );
  };

  render() {
    const { style, size, type, animatable, duration } = this.props;

    const ImageWrapper = animatable ? Animatable.Image : Image;

    const sizeFormatted = upperFirst(size);

    return (
      <View style={[styles.container, style]}>
        <ImageWrapper
          animation="slideInLeft"
          duration={duration}
          delay={200}
          style={[styles.carImage, styles[`carImage${sizeFormatted}`]]}
          source={assets.carTypes[type]}
          resizeMode="contain"
        />

        {this.renderLogo(sizeFormatted)}
      </View>
    );
  }
}
export default CarImage;
