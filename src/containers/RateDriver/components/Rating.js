import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'components/index';

const styles = StyleSheet.create({
  ratingHolder: {
    flexDirection: 'row',
    marginVertical: 13
  },
  starHolder: {
    paddingHorizontal: 5
  }
});

const Rating = ({ value, style, onChange, ratingCount, disabled }) => (
  <View style={[styles.ratingHolder, style]}>
    {Array.from(Array(ratingCount)).map((_, i) => {
      const isActive = value >= i + 1;
      return (
        <TouchableOpacity
          onPress={() => !disabled && onChange(i + 1)}
          activeOpacity={disabled ? 1 : 0.6}
          key={i}
          style={styles.starHolder}
        >
          <Icon name={isActive ? 'star' : 'starEmpty'} color={isActive ? '#f6b530' : '#e7e7e7'} size={30} />
        </TouchableOpacity>
      );
    })}
  </View>
);

Rating.propTypes = {
  value: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  onChange: PropTypes.func
};

Rating.defaultProps = {
  value: 0,
  style: null,
  onChange: () => {},
  ratingCount: 5
};

export default Rating;
