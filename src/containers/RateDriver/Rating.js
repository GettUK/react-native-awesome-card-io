import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'components';

import styles from './styles';

const Rating = ({ value, style, onChange, ratingCount }) => (
    <View style={[styles.ratingHolder, style]}>
      {Array.from(Array(ratingCount)).map((_, i) => {
        const isActive = value >= i + 1;
        return (
          <TouchableOpacity onPress={() => onChange(i + 1)} activeOpacity={0.6} key={i} style={styles.starHolder}>
            <Icon name="star" color={isActive ? '#f6b530' : '#e7e7e7'} size={50} />
          </TouchableOpacity>
        );
      })}
    </View>
);

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  onChange: PropTypes.func
};

Rating.defaultProps = {
  style: null,
  onChange: () => {},
  ratingCount: 5
};

export default Rating;
